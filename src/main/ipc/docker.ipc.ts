import { DockerService } from "../service/docker.service";
import { ipcMain } from "electron";

const dockerService = new DockerService();

export function registerDockerodeIpc(): void {
  ipcMain.handle("docker:ping", async () => {
    return dockerService.ping();
  });

  ipcMain.handle("docker:list_containers", async (_, all: boolean = true) => {
    return dockerService.listContainers(all);
  });
}
