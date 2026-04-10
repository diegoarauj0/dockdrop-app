import { Boxes, ChevronLeft, ChevronRight, LayoutDashboard, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";
import { ReactElement } from "react";
import * as S from "./sidebar.style";

type SideBarComponentProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function SideBarComponent({ isCollapsed, onToggleCollapse }: SideBarComponentProps): React.ReactNode {
  const { pathname } = useLocation();

  const links: { name: string; link: string; icon: ReactElement }[] = [
    { name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Settings", link: "/settings", icon: <Settings /> },
  ];

  return (
    <S.SideBar $isCollapsed={isCollapsed}>
      <S.Header $isCollapsed={isCollapsed}>
        <S.BrandIcon>
          <Boxes size={18} strokeWidth={2} />
        </S.BrandIcon>
        {!isCollapsed && <S.BrandName>DockDrop</S.BrandName>}
        <S.ToggleButton type="button" onClick={onToggleCollapse} $isCollapsed={isCollapsed}>
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </S.ToggleButton>
      </S.Header>

      <S.Nav>
        <S.NavList>
          {links.map(({ icon, link, name }) => (
            <li key={link}>
              <S.NavItem $isActive={pathname === link} $isCollapsed={isCollapsed}>
                <Link to={link} replace>
                  {icon}
                  <span>{name}</span>
                </Link>
              </S.NavItem>
            </li>
          ))}
        </S.NavList>
      </S.Nav>
    </S.SideBar>
  );
}
