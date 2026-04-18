import { dockerController } from "../controllers/docker.controller";
import { BrowserWindow, ipcMain } from "electron";
import { IpcWrapper } from "../ipcWrapper";

export function registerDockerodeIpc(win: BrowserWindow): void {
  ipcMain.handle("docker:ping", IpcWrapper.wrap(dockerController.ping));

  ipcMain.handle("docker:list_containers", IpcWrapper.wrap(dockerController.listContainers));

  ipcMain.handle("docker:delete_container", IpcWrapper.wrap(dockerController.deleteContainer));

  ipcMain.handle("docker:start_container", IpcWrapper.wrap(dockerController.startContainer));

  ipcMain.handle("docker:stop_container", IpcWrapper.wrap(dockerController.stopContainer));

  ipcMain.handle("docker:create_container", IpcWrapper.wrap(dockerController.createContainer));

  ipcMain.handle("docker:pull_image", IpcWrapper.wrap(dockerController.pullImage));

  ipcMain.handle("docker:get_image", IpcWrapper.wrap(dockerController.getImage));

  ipcMain.handle("docker:get_container_details", IpcWrapper.wrap(dockerController.getContainerDetails));

  ipcMain.on(
    "stats:start",
    IpcWrapper.wrap(async (_: unknown, ids: string[]) =>
      dockerController.statsStart(_, ids, (values) => {
        win.webContents.send("stats:batch", Array.from(values));
      }),
    ),
  );

  ipcMain.on("stats:stop", IpcWrapper.wrap(dockerController.stopContainer));
}
