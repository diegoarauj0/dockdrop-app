/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContainerNotFoundException } from "../exceptions/containerNotFound.exception";
import { DockerException } from "../exceptions/docker.exception";
import Docker, { ContainerStats } from "dockerode";
import { is } from "@electron-toolkit/utils";
import { Readable } from "stream";

export class DockerStatsManagerService {
  private readonly cache = new Map<string, ContainerStats>();
  private readonly streams = new Map<string, Readable>();
  private readonly initializing = new Set<string>();
  private readonly docker = new Docker();
  private readonly isDev = is.dev;

  private readonly BATCH_DELAY = 1000;
  private interval?: NodeJS.Timeout;

  public async start(containerId: string): Promise<void> {
    this.logger("start", { containerId });

    if (this.streams.has(containerId) || this.initializing.has(containerId)) return;

    this.initializing.add(containerId);

    try {
      const container = this.docker.getContainer(containerId);

      const exists = await this.checkIfContainerExists(container);

      if (!exists) throw new ContainerNotFoundException(containerId);

      const stream = (await container.stats({ stream: true })) as Readable;

      this.streams.set(containerId, stream);

      const onData = (chunk: Buffer): void => {
        try {
          const stats = JSON.parse(chunk.toString()) as ContainerStats;
          this.cache.set(containerId, stats);
        } catch (err) {
          this.logger("parse_error", { containerId, err });
        }
      };

      const cleanup = (): void => {
        this.logger("cleanup", { containerId });
        this.cache.delete(containerId);
        this.streams.delete(containerId);
        stream.removeAllListeners();
      };

      stream.on("data", onData);
      stream.once("end", cleanup);
      stream.once("close", cleanup);
      stream.once("error", (err) => {
        this.logger("stream_error", { containerId, err });
        cleanup();
      });
    } catch (err: any) {
      if (err instanceof ContainerNotFoundException) throw err;
      throw new DockerException(err);
    } finally {
      this.initializing.delete(containerId);
    }
  }

  public stop(containerId: string): void {
    this.logger("stop", { containerId });

    try {
      const stream = this.streams.get(containerId);

      const container = this.docker.getContainer(containerId);
      const exists = this.checkIfContainerExists(container);

      if (!exists) throw new ContainerNotFoundException(containerId);

      if (!stream) return;

      stream.removeAllListeners();
      stream.destroy();

      this.streams.delete(containerId);
      this.cache.delete(containerId);
    } catch (err: any) {
      if (err instanceof ContainerNotFoundException) throw err;
      throw new DockerException(err);
    }
  }

  public startBroadcast(callback: (values: ContainerStats[]) => void): void {
    this.logger("startBroadcast");

    if (this.interval) return;

    this.interval = setInterval(() => {
      if (this.cache.size === 0) return;

      callback(Array.from(this.cache.values()));
    }, this.BATCH_DELAY);
  }

  public stopBroadcast(): void {
    this.logger("stopBroadcast");

    if (!this.interval) return;

    clearInterval(this.interval);
    this.interval = undefined;
  }

  private async checkIfContainerExists(container: Docker.Container): Promise<boolean> {
    try {
      await container.inspect();
      return true;
    } catch (err: any) {
      if (err.statusCode === 404) return false;
      throw err;
    }
  }

  private logger(event: string, data?: unknown): void {
    if (!this.isDev) return;

    console.log(`[${new Date().toISOString()}] [DockerStatsManagerService] ${event}`, data ?? "");
  }
}

export const dockerStatsManagerService = new DockerStatsManagerService();
