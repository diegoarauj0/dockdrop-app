import Docker, { ContainerStats } from "dockerode";
import { BrowserWindow } from "electron";
import { Readable } from "stream";

export class DockerStatsManagerService {
  private readonly streams = new Map<string, Readable>();
  private readonly cache = new Map<string, ContainerStats>();
  private readonly initializing = new Set<string>();
  private readonly docker = new Docker();
  private readonly BATCH_DELAY = 1000;
  private interval?: NodeJS.Timeout;

  constructor(private win: BrowserWindow) {}

  public async start(id: string): Promise<void> {
    console.log(`[MAIN] DockerStatsManagerService.start ${JSON.stringify({ id })}`);

    if (this.streams.has(id) || this.initializing.has(id)) return;

    this.initializing.add(id);

    const container = this.docker.getContainer(id);

    const stream = await container.stats({ stream: true });

    this.streams.set(id, stream as Readable);

    stream.on("data", (chunk) => {
      const stats = JSON.parse(chunk.toString()) as ContainerStats;
      this.cache.set(id, stats);
    });

    stream.on("end", () => {
      this.streams.delete(id);
      this.cache.delete(id);
    });

    this.initializing.delete(id);
  }

  public stop(id: string): void {
    console.log(`[MAIN] DockerStatsManagerService.stop ${JSON.stringify({ id })}`);
    const stream = this.streams.get(id);

    if (stream) {
      stream.removeAllListeners();
      stream.destroy();
    }

    this.cache.delete(id);
    this.streams.delete(id);
  }

  public startBroadcast(): void {
    console.log("[MAIN] DockerStatsManagerService.startBroadcast");
    if (this.interval) return;

    this.interval = setInterval(() => {
      const stats: ContainerStats[] = [];

      this.cache.forEach((value) => stats.push(value));

      this.win.webContents.send("stats:batch", stats);
    }, this.BATCH_DELAY);
  }

  public stopBroadcast(): void {
    console.log("[MAIN] DockerStatsManagerService.stopBroadcast");
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
}
