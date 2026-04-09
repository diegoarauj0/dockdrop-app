import { ActiveContainersArea } from "../../components/activeContainersArea/activeContainersArea";
import { InactiveContainersArea } from "../../components/inactiveContainersArea/inactiveContainersArea";
import { StatsGridComponent } from "../../components/statsGrid/statsGrid";
import { Plus, Search } from "lucide-react";
import * as S from "./dashboard.style";

export function DashboardPage() {
  return (
    <S.Dashboard>
      <S.TopBar>
        <S.SearchWrapper>
          <Search size={18} />
          <S.SearchInput aria-label="Search containers" placeholder="Search containers..." type="text" />
        </S.SearchWrapper>

        <S.CreateButton type="button">
          <Plus size={16} strokeWidth={2.5} />
          New Container
        </S.CreateButton>
      </S.TopBar>

      <StatsGridComponent />

      <S.ContainerAreas>
        <ActiveContainersArea />
        <InactiveContainersArea />
      </S.ContainerAreas>
    </S.Dashboard>
  );
}
