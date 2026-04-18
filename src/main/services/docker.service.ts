/* eslint-disable @typescript-eslint/no-explicit-any */
import { is } from "@electron-toolkit/utils";
import Docker, { ContainerInspectInfo, ImageInspectInfo } from "dockerode";
import { DockerException } from "../exceptions/docker.exception";
import { ContainerNotFoundException } from "../exceptions/containerNotFound.exception";
import { ImageNotFoundException } from "../exceptions/imageNotFound.exception";

export interface InterfaceCreateContainer {
  image: string;
  name?: string;
  ports?: InterfaceCreateContainerPort[];
  envs?: InterfaceCreateContainerEnv[];
}

export interface InterfaceDockerImagePayload {
  image: string;
}

interface InterfaceCreateContainerPort {
  hostPort: string | number;
  containerPort: string | number;
  protocol?: "tcp" | "udp" | "sctp";
}

interface InterfaceCreateContainerEnv {
  key: string;
  value: string;
}

class DockerService {
  private readonly docker = new Docker();
  private readonly isDev = is.dev;

  public async createContainer(payload: InterfaceCreateContainer): Promise<void> {
    this.logger("createContainer", payload);

    try {
      const exposedPorts = this.buildExposedPorts(payload.ports);
      const portBindings = this.buildPortBindings(payload.ports);
      const envs = this.buildEnvList(payload.envs);
      const containerName = payload.name?.trim() || undefined;
      const imageName = payload.image.trim();

      await this.docker.createContainer({
        Image: imageName,
        name: containerName,
        Env: envs,
        ExposedPorts: exposedPorts,
        HostConfig: portBindings ? { PortBindings: portBindings } : undefined,
      });
    } catch (err: any) {
      throw new DockerException(err as Error);
    }
  }

  public async getImage(image: string): Promise<ImageInspectInfo> {
    try {
      this.logger("hasImage", image);

      const imageName = image.trim();
      return await this.docker.getImage(imageName).inspect();
    } catch (err: any) {
      if (err.statusCode === 404) throw new ImageNotFoundException(image);

      throw new DockerException(err as Error);
    }
  }

  public async pullImage(image: string): Promise<void> {
    this.logger("pullImage", { image });

    return new Promise((resolve, reject) => {
      const imageName = image.trim();

      this.docker.pull(imageName, (error, stream) => {
        if (error) return reject(new DockerException(error));
        if (!stream) return reject(new Error(`Unable to pull image "${imageName}"`));

        this.docker.modem.followProgress(stream, (followError) => {
          if (followError) return reject(new DockerException(followError));

          resolve();
        });
      });
    });
  }

  public async ping(): Promise<void> {
    try {
      this.logger("ping");
      await this.docker.ping();
    } catch (err: unknown) {
      throw new DockerException(err as Error);
    }
  }

  public async listContainers(): Promise<Docker.ContainerInfo[]> {
    try {
      this.logger("listContainer");

      return await this.docker.listContainers({ all: true });
    } catch (err: unknown) {
      throw new DockerException(err as Error);
    }
  }

  public async deleteContainer(containerId: string): Promise<void> {
    try {
      this.logger("deleteContainer", { containerId });

      const container = this.docker.getContainer(containerId);
      await container.remove();
    } catch (err: any) {
      if (err.statusCode === 404) throw new ContainerNotFoundException(containerId);

      throw new DockerException(err as Error);
    }
  }

  public async startContainer(containerId: string): Promise<void> {
    try {
      this.logger("startContainer", { containerId });

      const container = this.docker.getContainer(containerId);
      await container.start();
    } catch (err: any) {
      if (err.statusCode === 404) throw new ContainerNotFoundException(containerId);

      throw new DockerException(err as Error);
    }
  }

  public async stopContainer(containerId: string): Promise<void> {
    try {
      this.logger("stopContainer", { containerId });

      const container = this.docker.getContainer(containerId);
      await container.stop();
    } catch (err: any) {
      if (err.statusCode === 404) throw new ContainerNotFoundException(containerId);
      throw new DockerException(err as Error);
    }
  }

  public async getContainerDetails(containerId: string): Promise<ContainerInspectInfo> {
    try {
      this.logger("getContainerDetails", { containerId });

      const container = this.docker.getContainer(containerId);
      return container.inspect();
    } catch (err: any) {
      if (err.statusCode === 404) throw new ContainerNotFoundException(containerId);
      throw new DockerException(err as Error);
    }
  }

  private buildExposedPorts(ports?: InterfaceCreateContainerPort[]): Record<string, Record<string, string>> | undefined {
    if (!ports?.length) return undefined;

    return Object.fromEntries(ports.map((port) => [this.getPortKey(port), {}]));
  }

  private buildPortBindings(ports?: InterfaceCreateContainerPort[]): NonNullable<Docker.HostConfig["PortBindings"]> | undefined {
    if (!ports?.length) return undefined;

    return Object.fromEntries(
      ports.map((port) => [
        this.getPortKey(port),
        [
          {
            HostPort: String(port.hostPort),
            HostIp: "0.0.0.0",
          },
        ],
      ]),
    );
  }

  private getPortKey({ containerPort, protocol = "tcp" }: InterfaceCreateContainerPort): string {
    return `${containerPort}/${protocol}`;
  }

  private buildEnvList(envs?: InterfaceCreateContainerEnv[]): string[] | undefined {
    if (!envs?.length) return undefined;

    return envs.map(({ key, value }) => `${key.trim()}=${value}`);
  }

  private logger(event: string, data?: unknown): void {
    if (!this.isDev) return;

    console.log(`[${new Date().toISOString()}] [DockerService] ${event}`, data ?? "");
  }
}

export const dockerService = new DockerService();
