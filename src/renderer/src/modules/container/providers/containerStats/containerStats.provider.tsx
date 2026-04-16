import { dockerClient } from "../../../docker/docker.client";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useContainersQuery } from "../../queries/useContainers.query";
import { ContainerStatsContext } from "./containerStats.context";
import { ContainerStats } from "dockerode";

export function ContainerStatsProvider({ children }: PropsWithChildren): ReactNode {
  const [containerStats, setContainerStats] = useState<ContainerStats[]>([]);
  const { data } = useContainersQuery();

  data?.activeContainers.forEach(({ Id }) => {
    if (containerStats.find(({ id }) => id === Id)) return;
    dockerClient.startStats([Id]);
  });

  containerStats.forEach(({ id }) => {
    if (id === undefined) return;
    if (data?.activeContainers.find(({ Id }) => id === Id)) return;
    dockerClient.stopStats([id]);
  });

  useEffect(() => {
    dockerClient.onStatsBatch((containerStats) => setContainerStats(containerStats));
  }, []);

  return <ContainerStatsContext.Provider value={{ containerStats }}>{children}</ContainerStatsContext.Provider>;
}
