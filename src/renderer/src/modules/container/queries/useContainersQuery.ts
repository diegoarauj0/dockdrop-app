import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { dockerService } from "../../docker/services/docker.service";
import { ContainerInfo } from "dockerode";

export interface InterfaceUseContainers {
  inactiveContainers: ContainerInfo[];
  activeContainers: ContainerInfo[];
  containers: ContainerInfo[];
}

export function useContainersQuery(all: boolean): UseQueryResult<InterfaceUseContainers> {
  return useQuery({
    queryKey: ["docker-containers", all],
    queryFn: () => dockerService.listContainers(all),
    refetchInterval: 3000,

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
