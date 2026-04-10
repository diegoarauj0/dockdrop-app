import { useState } from "react";
import { Outlet } from "react-router";
import * as S from "./app.style";
import { SideBarComponent } from "../../components/sidebar/sidebar";

export function AppLayout(): React.ReactNode {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
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
  );
}
