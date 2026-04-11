import { DockerStatsManagerService } from "../service/dockerStatsManager.service";
import { BrowserWindow, ipcMain } from "electron";

export function registerDockerStatsIpc(win: BrowserWindow): void {
  const dockerStatsManagerService = new DockerStatsManagerService(win);

  ipcMain.on("stats:start", (_, ids: string[]) => {
    ids.forEach((id) => dockerStatsManagerService.start(id));
    dockerStatsManagerService.startBroadcast();
  });

  ipcMain.on("stats:stop", (_, ids: string[]) => {
    ids.forEach((id) => dockerStatsManagerService.stop(id));
  });
}
