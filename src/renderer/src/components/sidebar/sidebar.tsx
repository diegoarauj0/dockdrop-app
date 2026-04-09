import { Boxes, LayoutDashboard, Settings } from "lucide-react";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router";
import * as S from "./sidebar.style";

export function SideBarComponent() {
  const { pathname } = useLocation();

  const links: { name: string; link: string; icon: ReactElement }[] = [
    { name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Settings", link: "/settings", icon: <Settings /> },
  ];

  return (
    <S.SideBar>
      <S.Header>
        <S.BrandIcon>
          <Boxes size={18} strokeWidth={2} />
        </S.BrandIcon>
        <S.BrandName>DockDrop</S.BrandName>
      </S.Header>

      <S.Nav>
        <S.NavList>
          {links.map(({ icon, link, name }) => (
            <li key={link}>
              <S.NavItem $isActive={pathname === link}>
                <Link to={link} replace>
                  {icon}
                  {name}
                </Link>
              </S.NavItem>
            </li>
          ))}
        </S.NavList>
      </S.Nav>
    </S.SideBar>
  );
}
