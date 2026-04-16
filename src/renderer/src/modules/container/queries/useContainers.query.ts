import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { dockerClient } from "../../docker/docker.client";
import { ContainerInfo } from "dockerode";

export interface InterfaceUseContainers {
  containers: ContainerInfo[] | undefined;
  inactiveContainers: ContainerInfo[];
  activeContainers: ContainerInfo[];
}

export function useContainersQuery(): UseQueryResult<InterfaceUseContainers> {
  return useQuery({
    queryKey: ["docker-containers"],
    queryFn: () => dockerClient.listContainers(),
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
