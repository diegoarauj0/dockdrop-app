import { DockerService } from "../service/docker.service";
import { ipcMain } from "electron";

const dockerService = new DockerService();

export function registerDockerodeIpc(): void {
  ipcMain.handle("docker:ping", async () => {
    return dockerService.ping();
  });

  ipcMain.handle("docker:list_containers", async () => {
    return dockerService.listContainers();
  });

  ipcMain.handle("docker:delete_container", async (_, containerId: string) => {
    return dockerService.deleteContainer(containerId);
  });

  ipcMain.handle("docker:start_container", async (_, containerId: string) => {
    return dockerService.startContainer(containerId);
  });

  ipcMain.handle("docker:stop_container", async (_, containerId: string) => {
    return dockerService.stopContainer(containerId);
  });
}
