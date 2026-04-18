import { ContainerInfo, ContainerInspectInfo, ContainerStats, ImageInspectInfo } from "dockerode";

export interface InterfaceCreateContainer {
  image: string;
  name?: string;
  ports?: InterfaceCreateContainerPort[];
  envs?: InterfaceCreateContainerEnv[];
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

export class DockerClient {
  public readonly isDev = import.meta.env.MODE === "development";

  public async ping(): Promise<true> {
    this.logger("ping");
    
    const result = await window.electron.ipcRenderer.invoke("docker:ping");
    this.logger("ping => result", result);

    if (!result.success) throw result.error;

    return true;
  }

  public async listContainers(): Promise<ContainerInfo[]> {
    this.logger("listContainers");

    const result = await window.electron.ipcRenderer.invoke("docker:list_containers");
    this.logger("listContainers => result", result);

    if (!result.success) throw result.error;

    return result.data || [];
  }

  public async deleteContainer(containerId: string): Promise<boolean> {
    this.logger("deleteContainer", { containerId });

    const result = await window.electron.ipcRenderer.invoke("docker:delete_container", containerId);
    this.logger("deleteContainer => result", result);

    if (!result.success) throw result.error;

    return result.success;
  }

  public async startContainer(containerId: string): Promise<boolean> {
    this.logger("startContainer", { containerId });

    const result = await window.electron.ipcRenderer.invoke("docker:start_container", containerId);
    this.logger("startContainer => result", result);

    if (!result.success) throw result.error;

    return result.success;
  }

  public async stopContainer(containerId: string): Promise<boolean> {
    this.logger("stopContainer", { containerId });

    const result = await window.electron.ipcRenderer.invoke("docker:stop_container", containerId);
    this.logger("stopContainer => result", result);

    if (!result.success) throw result.error;

    return result.success;
  }

  public async createContainer(payload: InterfaceCreateContainer): Promise<boolean> {
    this.logger("createContainer", payload);

    const result = await window.electron.ipcRenderer.invoke("docker:create_container", payload);
    this.logger("createContainer", result);

    if (!result.success) throw result.error;

    return result.success;
  }

  public async getImage(image: string): Promise<ImageInspectInfo> {
    this.logger("getImage", { image });

    const result = await window.electron.ipcRenderer.invoke("docker:get_image", image);
    this.logger("getImage => result", result);

    if (!result.success) throw result.error;

    return result.data;
  }

  public async pullImage(image: string): Promise<void> {
    this.logger("pullImage", { image });

    const result = await window.electron.ipcRenderer.invoke("docker:pull_image", image);
    this.logger("getImage => result", result);

    if (!result.success) throw result.error;
  }

  public async inspectContainer(containerId: string): Promise<ContainerInspectInfo> {
    this.logger("inspectContainer", { containerId });

    const result = await window.electron.ipcRenderer.invoke("docker:inspect_container", containerId);
    this.logger("inspectContainer", result);

    if (!result.success) throw result.error;

    return result.data;
  }

  public startStats(ids: string[]): void {
    this.logger("startStats", { ids });

    window.electron.ipcRenderer.send("stats:start", ids);
  }

  public stopStats(ids: string[]): void {
    this.logger("stopStats", { ids });

    window.electron.ipcRenderer.send("stats:stop", ids);
  }

  public onStatsBatch(callback: (stats: ContainerStats[]) => void): void {
    this.logger("onStatsBatch");

    window.electron.ipcRenderer.on("stats:batch", (_, stats) => callback(stats));
  }

  private logger(event: string, data?: unknown): void {
    if (!this.isDev) return;

    console.log(`[${new Date().toISOString()}] [DockerClient] ${event}`, data ?? "");
  }
}

export const dockerClient = new DockerClient();
