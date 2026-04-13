import { ContainerStats } from "dockerode";

class DockerStatsManagerService {
  public async start(ids: string[]): Promise<void> {
    console.log(`[RENDERER] DockerStatsManagerService.start ${JSON.stringify({ ids })}`);
    window.electron.ipcRenderer.send("stats:start", ids);
  }

  public stop(ids: string[]): void {
    console.log(`[RENDERER] DockerStatsManagerService.stop ${JSON.stringify({ ids })}`);
    window.electron.ipcRenderer.send("stats:stop", ids);
  }

  public batch(callback: (stats: ContainerStats[]) => void): void {
    console.log("[RENDERER] DockerStatsManagerService.batch");
    window.electron.ipcRenderer.on("stats:batch", (_, stats) => callback(stats));
  }
}

export const dockerStatsManagerService = new DockerStatsManagerService()