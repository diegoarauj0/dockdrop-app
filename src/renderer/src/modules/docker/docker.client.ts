import { ContainerInfo, ContainerStats } from "dockerode";

export class DockerClient {
  public readonly isDev = import.meta.env.MODE === "development";

  public async ping(): Promise<boolean> {
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] ping`);

    const result = await window.electron.ipcRenderer.invoke("docker:ping");
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] ping => success: ${JSON.stringify(result)}`);

    if (!result.success) throw new Error(result.error);

    return result.success;
  }

  public async listContainers(): Promise<ContainerInfo[]> {
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] listContainers`);

    const result = await window.electron.ipcRenderer.invoke("docker:list_containers");
    if (this.isDev)
      console.log(`[${new Date().toISOString()}] [DockerClient] listContainers => success: ${JSON.stringify(result)}`);

    if (!result.success) throw new Error(result.error);

    return result.data || [];
  }

  public async deleteContainer(containerId: string): Promise<boolean> {
    if (this.isDev)
      console.log(`[${new Date().toISOString()}] [DockerClient] deleteContainer ${JSON.stringify({ containerId })}`);

    const result = await window.electron.ipcRenderer.invoke("docker:delete_container", containerId);
    if (this.isDev)
      console.log(`[${new Date().toISOString()}] [DockerClient] deleteContainer => success: ${JSON.stringify(result)}`);

    if (!result.success) throw new Error(result.error);

    return result.success;
  }

  public async startContainer(containerId: string): Promise<boolean> {
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] startContainer ${JSON.stringify({ containerId })}`);

    const result = await window.electron.ipcRenderer.invoke("docker:start_container", containerId);
    if (this.isDev)
      console.log(`[${new Date().toISOString()}] [DockerClient] startContainer => success: ${JSON.stringify(result)}`);

    if (!result.success) throw new Error(result.error);

    return result.success;
  }

  public async stopContainer(containerId: string): Promise<boolean> {
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] stopContainer ${JSON.stringify({ containerId })}`);

    const result = await window.electron.ipcRenderer.invoke("docker:stop_container", containerId);
    if (this.isDev)
      console.log(`[${new Date().toISOString()}] [DockerClient] stopContainer => success: ${JSON.stringify(result)}`);

    if (!result.success) throw new Error(result.error);

    return result.success;
  }

  public startStats(ids: string[]): void {
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] startStats ${JSON.stringify({ ids })}`);

    window.electron.ipcRenderer.send("stats:start", ids);
  }

  public stopStats(ids: string[]): void {
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] stopStats ${JSON.stringify({ ids })}`);

    window.electron.ipcRenderer.send("stats:stop", ids);
  }

  public onStatsBatch(callback: (stats: ContainerStats[]) => void): void {
    if (this.isDev) console.log(`[${new Date().toISOString()}] [DockerClient] onStatsBatch`);

    window.electron.ipcRenderer.on("stats:batch", (_, stats) => callback(stats));
  }
}

export const dockerClient = new DockerClient();
