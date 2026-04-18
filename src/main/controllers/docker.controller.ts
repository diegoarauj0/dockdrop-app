import { ContainerInfo, ContainerInspectInfo, ContainerStats, ImageInspectInfo } from "dockerode";
import { dockerService, InterfaceCreateContainer } from "../services/docker.service";
import { dockerStatsManagerService } from "../services/dockerStatsManager.service";

export class DockerController {
  public statsStart(_: unknown, ids: string[], callback: (values: ContainerStats[]) => void): void {
    ids.forEach((id) => dockerStatsManagerService.start(id));
    dockerStatsManagerService.startBroadcast(callback);
  }

  public statsStop(_: unknown, ids: string[]): void {
    ids.forEach((id) => dockerStatsManagerService.stop(id));
  }

  public async ping(): Promise<void> {
    await dockerService.ping();
  }

  public async getContainerDetails(_: unknown, containerId: string): Promise<ContainerInspectInfo> {
    return await dockerService.getContainerDetails(containerId);
  }

  public async createContainer(_: unknown, payload: InterfaceCreateContainer): Promise<void> {
    return await dockerService.createContainer(payload);
  }

  public async pullImage(_: unknown, image: string): Promise<void> {
    return await dockerService.pullImage(image);
  }

  public async getImage(_: unknown, image: string): Promise<ImageInspectInfo> {
    return await dockerService.getImage(image);
  }

  public async listContainers(): Promise<ContainerInfo[]> {
    return await dockerService.listContainers();
  }

  public async deleteContainer(_: unknown, containerId: string): Promise<void> {
    await dockerService.deleteContainer(containerId);
  }

  public async stopContainer(_: unknown, containerId: string): Promise<void> {
    await dockerService.stopContainer(containerId);
  }

  public async startContainer(_: unknown, containerId: string): Promise<void> {
    await dockerService.startContainer(containerId);
  }
}

export const dockerController = new DockerController();
