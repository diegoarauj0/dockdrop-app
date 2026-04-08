import Docker from "dockerode"

export class DockerodeService {
  private docker = new Docker()

  async ping(): Promise<boolean> {
    try {
      await this.docker.ping()
      return true
    } catch {
      return false
    }
  }

  async listContainers(all = true): Promise<Docker.ContainerInfo[]> {
    return this.docker.listContainers({ all })
  }
}
