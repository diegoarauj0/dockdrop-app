import { is } from "@electron-toolkit/utils";
import Docker from "dockerode";

export class DockerodeService {
  private readonly docker = new Docker();
  private readonly isDev = is.dev;

  public async ping(): Promise<{ success: boolean; error?: string }> {
    console.log(`[MAIN] DockerodeService.ping`);
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
    console.log(`[MAIN] DockerodeService.listContainers ${JSON.stringify({ all })}`);
    return this.docker.listContainers({ all });
  }
}
