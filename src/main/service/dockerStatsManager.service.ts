import Docker, { ContainerStats } from "dockerode";
import { is } from "@electron-toolkit/utils";
import { BrowserWindow } from "electron";
import { Readable } from "stream";

export class DockerStatsManagerService {
  private readonly cache = new Map<string, ContainerStats>();
  private readonly streams = new Map<string, Readable>();
  private readonly initializing = new Set<string>();
  private readonly docker = new Docker();
  private readonly isDev = is.dev;

  private readonly BATCH_DELAY = 1000;
  private interval?: NodeJS.Timeout;

  constructor(private readonly win: BrowserWindow) {}

  public async start(id: string): Promise<void> {
    this.logger("start", { id });

    if (this.streams.has(id) || this.initializing.has(id)) return;

    this.initializing.add(id);

    try {
      const container = this.docker.getContainer(id);
      const stream = (await container.stats({ stream: true })) as Readable;

      this.streams.set(id, stream);

      const onData = (chunk: Buffer): void => {
        try {
          const stats = JSON.parse(chunk.toString()) as ContainerStats;
          this.cache.set(id, stats);
        } catch (err) {
          this.logger("parse_error", { id, err });
        }
      };

      const cleanup = (): void => {
        this.logger("cleanup", { id });
        this.cache.delete(id);
        this.streams.delete(id);
        stream.removeAllListeners();
      };

      stream.on("data", onData);
      stream.once("end", cleanup);
      stream.once("close", cleanup);
      stream.once("error", (err) => {
        this.logger("stream_error", { id, err });
        cleanup();
      });
    } catch (err) {
      this.logger("start_error", { id, err });
    } finally {
      this.initializing.delete(id);
    }
  }

  public stop(id: string): void {
    this.logger("stop", { id });

    const stream = this.streams.get(id);
    if (!stream) return;

    stream.removeAllListeners();
    stream.destroy();

    this.streams.delete(id);
    this.cache.delete(id);
  }

  public startBroadcast(): void {
    this.logger("startBroadcast");

    if (this.interval) return;

    this.interval = setInterval(() => {
      if (this.cache.size === 0) return;

      this.win.webContents.send("stats:batch", Array.from(this.cache.values()));
    }, this.BATCH_DELAY);
  }

  public stopBroadcast(): void {
    this.logger("stopBroadcast");

    if (!this.interval) return;

    clearInterval(this.interval);
    this.interval = undefined;
  }

  private logger(event: string, data?: unknown): void {
    if (!this.isDev) return;

    console.log(`[${new Date().toISOString()}] [DockerStatsManagerService] ${event}`, data ?? "");
  }
}
