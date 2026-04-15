import { is } from "@electron-toolkit/utils";
import Docker from "dockerode";

interface InterfaceSafeExecute<Data> {
  success: boolean;
  error?: string;
  data?: Data;
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

  private logger(event: string, data?: unknown): void {
    if (!this.isDev) return;

    console.log(`[${new Date().toISOString()}] [DockerService] ${event}`, data ?? "");
  }
}
