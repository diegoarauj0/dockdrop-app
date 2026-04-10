export class DockerodeService {
  async ping(): Promise<{ success: boolean }> {
    console.log(`[RENDERER] DockerodeService.ping`);
    return window.electron.ipcRenderer.invoke("docker:ping");
  }

  async listContainers(all = true): Promise<unknown[]> {
    console.log(`[RENDERER] DockerodeService.listContainers ${JSON.stringify({ all })}`);
    return window.electron.ipcRenderer.invoke("docker:list_containers", all);
  }
}
