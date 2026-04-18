import { IsCreatingContainerProvider } from "../../../container/providers/isCreatingContainer/isCreatingContainer.provider";
import { ContainerStatsProvider } from "../../../container/providers/containerStats/containerStats.provider";
import { ContainerModulesProvider } from "../../../container/providers/containerModules/containerModules.provider";
import { DockerAvailableProvider } from "../../../docker/providers/dockerAvailable.provider";
import { SideBarComponent } from "../../components/sidebar/sidebar.component";
import { Outlet } from "react-router";
import { useState } from "react";
import * as S from "./app.style";

export function AppLayout(): React.ReactNode {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <DockerAvailableProvider>
      <IsCreatingContainerProvider>
        <ContainerStatsProvider>
          <ContainerModulesProvider>
            <S.AppLayout>
              <S.SidebarContent $isCollapsed={isSidebarCollapsed}>
                <SideBarComponent
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
                />
              </S.SidebarContent>
              <S.MainContent $isCollapsed={isSidebarCollapsed}>
                <Outlet />
              </S.MainContent>
            </S.AppLayout>
          </ContainerModulesProvider>
        </ContainerStatsProvider>
      </IsCreatingContainerProvider>
    </DockerAvailableProvider>
  );
}
