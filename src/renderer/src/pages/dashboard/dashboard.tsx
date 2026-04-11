import { ActiveContainersArea } from "../../components/activeContainersArea/activeContainersArea";
import { InactiveContainersArea } from "../../components/inactiveContainersArea/inactiveContainersArea";
import { StatsGridComponent } from "../../components/statsGrid/statsGrid";
import { SearchContainers } from "../../components/searchContainers/searchContainers";
import { Plus } from "lucide-react";
import { useContainers } from "../../hooks/reactQuery/useContainers";
import { useState } from "react";
import * as S from "./dashboard.style";
import { ContainerInfo } from "dockerode";

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

      <S.ContainerAreas>
        <ActiveContainersArea
          containers={
            filteredContainers === null
              ? data?.activeContainers || []
              : filteredContainers.filter(({ State }) => State === "running")
          }
        />
        <InactiveContainersArea
          containers={
            filteredContainers === null
              ? data?.inactiveContainers || []
              : filteredContainers.filter(({ State }) => State === "exited")
          }
        />
      </S.ContainerAreas>
    </S.Dashboard>
  );
}
