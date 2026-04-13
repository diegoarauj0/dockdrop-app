import { ContainerInfo } from "dockerode";

class DockerService {
  public ping(): Promise<{ success: boolean }> {
    console.log(`[RENDERER] DockerService.ping`);
    return window.electron.ipcRenderer.invoke("docker:ping");
  }

  public listContainers(all = true): Promise<ContainerInfo[]> {
    console.log(`[RENDERER] DockerService.listContainers ${JSON.stringify({ all })}`);
    return window.electron.ipcRenderer.invoke("docker:list_containers", all);
  }

  public deleteContainer(containerId: string): Promise<{ success: boolean; error?: string }> {
    console.log(`[RENDERER] DockerService.deleteContainer ${containerId}`);
    return window.electron.ipcRenderer.invoke("docker:delete_container", containerId);
  }

  public startContainer(containerId: string): Promise<{ success: boolean; error?: string }> {
    console.log(`[RENDERER] DockerService.startContainer ${containerId}`);
    return window.electron.ipcRenderer.invoke("docker:start_container", containerId);
  }

  public stopContainer(containerId: string): Promise<{ success: boolean; error?: string }> {
    console.log(`[RENDERER] DockerService.stopContainer ${containerId}`);
    return window.electron.ipcRenderer.invoke("docker:stop_container", containerId);
  }
}

export const dockerService = new DockerService()