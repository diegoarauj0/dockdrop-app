import { useContainers } from "../../hooks/reactQuery/useContainers";
import { Activity, Box, Pause } from "lucide-react";
import * as S from "./statsGrid.style";
import { useContainerStats } from "../../providers/useContainerStats";
import { getCPUPercent } from "../../helpers/metric.helper";

export function StatsGridComponent(): React.ReactNode {
  const { data, isPending } = useContainers(true);
  const containersStats = useContainerStats();

  let avgCPU = 0;

  data?.activeContainers.forEach(({ Id }) => {
    const containerStat = containersStats.containerStats.find(({ id }) => id === Id);

    if (containerStat) {
      const cpu = getCPUPercent(containerStat);

      avgCPU += cpu;
    }
  });

  avgCPU = avgCPU / (data?.activeContainers.length || 1);

  const stats = [
    {
      icon: <Box size={18} />,
      label: "Total Containers",
      value: isPending ? "Loading..." : data?.containers.length,
      highlight: `${data?.activeContainers.length}/${data?.containers.length} running`,
      accent: "primary" as const,
    },
    {
      icon: <Activity size={18} />,
      label: "Active",
      value: isPending ? "Loading..." : data?.activeContainers.length,
      highlight: `CPU Usage ${avgCPU.toFixed(2)}%`,
      accent: "success" as const,
    },
    {
      icon: <Pause size={18} />,
      label: "Inactive",
      value: isPending ? "Loading..." : data?.inactiveContainers.length,
      highlight: "Stopped recently",
      accent: "danger" as const,
    },
  ];

  return (
    <S.StatsGrid>
      {stats.map(({ accent, highlight, icon, label, value }) => (
        <S.StatCard key={label}>
          <S.StatHeader>
            <S.StatIcon $accent={accent}>{icon}</S.StatIcon>
            <S.StatHighlight>{highlight}</S.StatHighlight>
          </S.StatHeader>

          <S.StatBody>
            <S.StatLabel>{label}</S.StatLabel>
            <S.StatValue>{value}</S.StatValue>
          </S.StatBody>
        </S.StatCard>
      ))}
    </S.StatsGrid>
  );
}
