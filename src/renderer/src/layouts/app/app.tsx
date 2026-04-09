import { Outlet } from "react-router";
import * as S from "./app.style";
import { SideBarComponent } from "../../components/sidebar/sidebar";

export function AppLayout() {
  return (
    <S.AppLayout>
      <S.SidebarContent>
        <SideBarComponent />
      </S.SidebarContent>
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.AppLayout>
  );
}
