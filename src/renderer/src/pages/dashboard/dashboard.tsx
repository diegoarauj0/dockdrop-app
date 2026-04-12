import { StatsGridComponent } from "../../components/statsGrid/statsGrid";
import { SearchContainers } from "../../components/searchContainers/searchContainers";
import { Plus } from "lucide-react";
import { useContainers } from "../../hooks/reactQuery/useContainers";
import { useState } from "react";
import * as S from "./dashboard.style";
import { ContainerInfo } from "dockerode";
import { ContainerAreasComponent } from "../../components/containerAreas/containerAreas";

export function DashboardPage(): React.ReactNode {
  const [filteredContainers, setFilteredContainers] = useState<ContainerInfo[] | null>(null);
  const { data } = useContainers(true);

  return (
    <S.Dashboard>
      <S.TopBar>
        <SearchContainers containers={data?.containers || []} setResult={setFilteredContainers} />

        <S.CreateButton type="button">
          <Plus size={16} strokeWidth={2.5} />
          New Container
        </S.CreateButton>
      </S.TopBar>

      <StatsGridComponent />
      <ContainerAreasComponent containers={(filteredContainers ?? data?.containers) || []} />
    </S.Dashboard>
  );
}
