import { SearchContainersComponent } from "../../../container/components/searchContainers/searchContainers.component";
import { ContainerAreasComponent } from "../../../container/components/containerAreas/containerAreas.component";
import { StatsGridComponent } from "../../../container/components/statsGrid/statsGrid.component";
import { useContainersQuery } from "../../../container/queries/useContainers.query";
import { ContainerInfo } from "dockerode";
import { useNavigate } from "react-router";
import * as S from "./dashboard.style";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function DashboardPage(): React.ReactNode {
  const [filteredContainers, setFilteredContainers] = useState<ContainerInfo[] | null>(null);
  const { data } = useContainersQuery();
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  return (
    <S.Dashboard>
      <S.TopBar>
        <SearchContainersComponent containers={data?.containers || []} setResult={setFilteredContainers} />

        <S.CreateButton type="button" onClick={() => navigate("/containers/new")}>
          <Plus size={16} strokeWidth={2.5} />
          {t("home_dashboard.new_container")}
        </S.CreateButton>
      </S.TopBar>

      <StatsGridComponent />
      <ContainerAreasComponent containers={(filteredContainers ?? data?.containers) || []} />
    </S.Dashboard>
  );
}
