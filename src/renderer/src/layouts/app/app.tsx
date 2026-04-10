import { SideBarComponent } from "../../components/sidebar/sidebar";
import { DockerProvider } from "../../providers/docker.provider";
import { Outlet } from "react-router";
import { useState } from "react";
import * as S from "./app.style";

export function AppLayout(): React.ReactNode {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <DockerProvider>
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
    </DockerProvider>
  );
}
