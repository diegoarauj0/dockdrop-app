import { is } from "@electron-toolkit/utils";
import Docker from "dockerode";

interface InterfaceSafeExecute<Data> {
  success: boolean;
  error?: string;
  data?: Data;
}

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

export class DockerService {
  private readonly docker = new Docker();
  private readonly isDev = is.dev;

  private async safeExecute<Result>(callback: () => Promise<Result>): Promise<InterfaceSafeExecute<Result>> {
    try {
      const data = await callback();
      return { success: true, data };
    } catch (err) {
      console.error(err);
      return { success: false, error: JSON.stringify(err) };
    }
  }

  public async createContainer(payload: InterfaceCreateContainer): Promise<InterfaceSafeExecute<undefined>> {
    this.logger("createContainer", payload);

    return this.safeExecute<undefined>(async () => {
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
    });
  }

  public async hasImage(payload: InterfaceDockerImagePayload): Promise<InterfaceSafeExecute<undefined>> {
    this.logger("hasImage", payload);

    try {
      const imageName = payload.image.trim();

      await this.docker.getImage(imageName).inspect();

      return { success: true };
    } catch (err) {
      const statusCode = (err as { statusCode?: number }).statusCode;

      if (statusCode === 404) return { success: false };

      console.error(err);
      return { success: false, error: JSON.stringify(err) };
    }
  }

  public async pullImage(payload: InterfaceDockerImagePayload): Promise<InterfaceSafeExecute<undefined>> {
    this.logger("pullImage", payload);

    return this.safeExecute<undefined>(
      async () =>
        new Promise((resolve, reject) => {
          const imageName = payload.image.trim();

          this.docker.pull(imageName, (error, stream) => {
            if (error) return reject(error);
            if (!stream) return reject(new Error(`Unable to pull image "${imageName}"`));

            this.docker.modem.followProgress(stream, (followError) => {
              if (followError) return reject(followError);

              resolve(undefined);
            });
          });
        }),
    );
  }

  public async ping(): Promise<InterfaceSafeExecute<undefined>> {
    this.logger("ping");

    return this.safeExecute<undefined>(async () => {
      await this.docker.ping();
    });
  }

  public async listContainers(): Promise<InterfaceSafeExecute<Docker.ContainerInfo[]>> {
    this.logger("listContainer");

    return this.safeExecute(async () => {
      return this.docker.listContainers({ all: true });
    });
  }

  public async deleteContainer(containerId: string): Promise<InterfaceSafeExecute<undefined>> {
    this.logger("deleteContainer", { containerId });

    return this.safeExecute<undefined>(async () => {
      const container = this.docker.getContainer(containerId);
      await container.remove();
    });
  }

  public async startContainer(containerId: string): Promise<InterfaceSafeExecute<undefined>> {
    this.logger("startContainer", { containerId });

    return this.safeExecute<undefined>(async () => {
      const container = this.docker.getContainer(containerId);
      await container.start();
    });
  }

  public async stopContainer(containerId: string): Promise<InterfaceSafeExecute<undefined>> {
    this.logger("stopContainer", { containerId });

    return this.safeExecute<undefined>(async () => {
      const container = this.docker.getContainer(containerId);
      await container.stop();
    });
  }

  public async getContainerDetails(containerId: string): Promise<InterfaceSafeExecute<unknown>> {
    this.logger("getContainerDetails", { containerId });

    return this.safeExecute(async () => {
      const container = this.docker.getContainer(containerId);
      return container.inspect();
    });
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
