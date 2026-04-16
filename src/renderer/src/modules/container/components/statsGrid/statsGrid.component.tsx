import { useContainerStats } from "../../providers/containerStats/containerStats.context";
import { containerMetricsService } from "../../containerMetrics.service";
import { useContainersQuery } from "../../queries/useContainers.query";
import { Activity, Box, Pause } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as S from "./statsGrid.style";

export function StatsGridComponent(): React.ReactNode {
  const { data, isPending } = useContainersQuery();
  const containersStats = useContainerStats();
  const { t } = useTranslation("container");

  let avgCPU = 0;

  data?.activeContainers.forEach(({ Id }) => {
    const containerStat = containersStats.containerStats.find(({ id }) => id === Id);

    if (containerStat) {
      const cpu = containerMetricsService.getCPUPercent(containerStat);

      avgCPU += cpu;
    }
  });

  avgCPU = avgCPU / (data?.activeContainers.length || 1);

  const stats = [
    {
      icon: <Box size={18} />,
      label: t("metrics.totalContainers"),
      value: isPending ? t("metrics.loading") : data?.containers?.length,
      highlight: `${data?.activeContainers.length}/${data?.containers?.length} ${t("metrics.running")}`,
      accent: "primary" as const,
    },
    {
      icon: <Activity size={18} />,
      label: t("metrics.active"),
      value: isPending ? t("metrics.loading") : data?.activeContainers.length,
      highlight: `${t("metrics.cpuUsage")} ${avgCPU.toFixed(2)}%`,
      accent: "success" as const,
    },
    {
      icon: <Pause size={18} />,
      label: t("metrics.inactive"),
      value: isPending ? t("metrics.loading") : data?.inactiveContainers.length,
      highlight: t("metrics.stoppedRecently"),
      accent: "danger" as const,
    },
  ];

  return (
    <S.StatsGrid>
      {stats.map(({ accent, highlight, icon, label, value }, index) => (
        <S.StatCard key={label} $last={index === stats.length - 1}>
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
