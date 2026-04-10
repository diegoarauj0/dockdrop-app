import { Activity, Box, Pause } from "lucide-react";
import * as S from "./statsGrid.style";

export function StatsGridComponent(): React.ReactNode {
  const stats = [
    {
      icon: <Box size={18} />,
      label: "Total Containers",
      value: "6",
      highlight: "+2 this week",
      accent: "primary" as const,
    },
    {
      icon: <Activity size={18} />,
      label: "Active",
      value: "6",
      highlight: "Running smoothly",
      accent: "success" as const,
    },
    {
      icon: <Pause size={18} />,
      label: "Inactive",
      value: "6",
      highlight: "Resources saved",
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
