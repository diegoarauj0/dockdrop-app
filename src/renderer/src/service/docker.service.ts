import { ContainerInfo } from "dockerode";

export class DockerService {
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
}
