import { dockerStatsManagerService } from "../../docker/services/dockerStatsManager.service";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useContainersQuery } from "../queries/useContainersQuery";
import { ContainerStatsContext } from "./containerStats.context";
import { ContainerStats } from "dockerode";

export function ContainerStatsProvider({ children }: PropsWithChildren): ReactNode {
  const [containerStats, setContainerStats] = useState<ContainerStats[]>([]);
  const { data } = useContainersQuery(true);

  data?.activeContainers.forEach(({ Id }) => {
    if (containerStats.find(({ id }) => id === Id)) return;
    dockerStatsManagerService.start([Id]);
  });

  containerStats.forEach(({ id }) => {
    if (id === undefined) return;
    if (data?.activeContainers.find(({ Id }) => id === Id)) return;
    dockerStatsManagerService.stop([id]);
  });

  useEffect(() => {
    dockerStatsManagerService.batch((containerStats) => setContainerStats(containerStats));
  }, []);

  return <ContainerStatsContext.Provider value={{ containerStats }}>{children}</ContainerStatsContext.Provider>;
}
