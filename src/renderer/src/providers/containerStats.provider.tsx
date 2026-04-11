import { DockerStatsManagerService } from "../service/dockerStatsManager.service";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useContainers } from "../hooks/reactQuery/useContainers";
import { ContainerStats } from "dockerode";
import { ContainerStatsContext } from "./useContainerStats";

const dockerStatsManagerService = new DockerStatsManagerService();

export function ContainerStatsProvider({ children }: PropsWithChildren): ReactNode {
  const [containerStats, setContainerStats] = useState<ContainerStats[]>([]);
  const { data } = useContainers(true);

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
