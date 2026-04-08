export class DockerodeService {
  async ping(): Promise<boolean> {
    return window.electron.ipcRenderer.invoke("docker:ping")
  }

  async listContainers(all = true): Promise<any[]> {
    return window.electron.ipcRenderer.invoke("docker:list_containers", all)
  }
}
