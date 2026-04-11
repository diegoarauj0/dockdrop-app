import { is } from "@electron-toolkit/utils";
import Docker from "dockerode";

export class DockerService {
  private readonly docker = new Docker();
  private readonly isDev = is.dev;

  public async ping(): Promise<{ success: boolean; error?: string }> {
    console.log(`[MAIN] DockerService.ping`);
    try {
      await this.docker.ping();
      return { success: true };
    } catch (error) {
      if (this.isDev) {
        console.warn("[MAIN] DockerodeService.ping error");
        console.error(error);
      }

      return { success: false, error: String(error) };
    }
  }

  public async listContainers(all = true): Promise<Docker.ContainerInfo[]> {
    console.log(`[MAIN] DockerService.listContainers ${JSON.stringify({ all })}`);
    return this.docker.listContainers({ all });
  }

  public async deleteContainer(containerId: string): Promise<{ success: boolean; error?: string }> {
    console.log(`[MAIN] DockerService.deleteContainer ${containerId}`);
    try {
      const container = this.docker.getContainer(containerId);
      await container.remove({ force: true });
      return { success: true };
    } catch (error) {
      if (this.isDev) {
        console.warn("[MAIN] DockerService.deleteContainer error");
        console.error(error);
      }
      return { success: false, error: String(error) };
    }
  }
}
