import { SearchContainersComponent } from "../../../container/components/searchContainers/searchContainers";
import { ContainerAreasComponent } from "../../../container/components/containerAreas/containerAreas";
import { StatsGridComponent } from "../../../container/components/statsGrid/statsGrid";
import { useContainersQuery } from "../../../container/queries/useContainersQuery";
import { ContainerInfo } from "dockerode";
import * as S from "./dashboard.style";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function DashboardPage(): React.ReactNode {
  const [filteredContainers, setFilteredContainers] = useState<ContainerInfo[] | null>(null);
  const { data } = useContainersQuery(true);
  const { t } = useTranslation("home");

  return (
    <S.Dashboard>
      <S.TopBar>
        <SearchContainersComponent containers={data?.containers || []} setResult={setFilteredContainers} />

        <S.CreateButton type="button">
          <Plus size={16} strokeWidth={2.5} />
          {t("home_dashboard.new_container")}
        </S.CreateButton>
      </S.TopBar>

      <StatsGridComponent />
      <ContainerAreasComponent containers={(filteredContainers ?? data?.containers) || []} />
    </S.Dashboard>
  );
}
