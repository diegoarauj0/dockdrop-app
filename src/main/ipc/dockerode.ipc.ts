import { DockerodeService } from "../service/dockerode.service"
import { ipcMain } from "electron"

const dockerodeService = new DockerodeService()

export function registerDockerodeIpc(): void {
  ipcMain.handle("docker:ping", async () => {
    return dockerodeService.ping()
  })

  ipcMain.handle("docker:list_containers", async (_, all: boolean = true) => {
    return dockerodeService.listContainers(all)
  })
}
 