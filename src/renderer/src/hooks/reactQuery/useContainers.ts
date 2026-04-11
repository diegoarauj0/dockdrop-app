import { DockerService } from "../../service/docker.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ContainerInfo } from "dockerode";

export interface IUseContainers {
  inactiveContainers: ContainerInfo[];
  activeContainers: ContainerInfo[];
  containers: ContainerInfo[];
}

export function useContainers(all: boolean): UseQueryResult<IUseContainers> {
  const dockerService = new DockerService();

  return useQuery({
    queryKey: ["docker-containers", all],
    queryFn: () => dockerService.listContainers(all),
    refetchInterval: 5000,

    refetchIntervalInBackground: false,

    select: (containers) => {
      return {
        activeContainers: containers.filter(({ State }) => State === "running"),
        inactiveContainers: containers.filter(({ State }) => State === "exited"),
        containers: containers,
      };
    },
  });
}
