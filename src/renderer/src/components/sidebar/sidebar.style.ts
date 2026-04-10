import styled from "styled-components";

type SidebarStateProps = {
  $isCollapsed: boolean;
};

export const SideBar = styled.main<SidebarStateProps>`
  background-color: ${(props) => props.theme["bg"]};
  flex-direction: column;
  border-radius: ${(props) => props.theme.radii.md};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xs};
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Header = styled.header<SidebarStateProps>`
  padding: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.md};
  align-items: center;
  display: flex;
  flex-wrap: ${(props) => (props.$isCollapsed ? "wrap" : "nowrap")};
  gap: ${(props) => props.theme.spacing.xs};
  justify-content: ${(props) => (props.$isCollapsed ? "center" : "space-between")};

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: none;
  }
`;

export const ToggleButton = styled.button<SidebarStateProps>`
  background: transparent;
  border: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme.border};
  color: ${(props) => props.theme["text-muted"]};
  border-radius: ${(props) => props.theme.radii.sm};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  margin-top: ${(props) => (props.$isCollapsed ? props.theme.spacing.sm : "0px")};
  height: ${(props) => props.theme.sizes.iconMd};
  width: ${(props) => (props.$isCollapsed ? "100%" : props.theme.sizes.iconMd)};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme["bg-light"]};
    color: ${(props) => props.theme.text};
  }
`;

export const BrandIcon = styled.div`
  background-color: ${(props) => props.theme.primary};
  border: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme.border};
  color: ${(props) => props.theme["bg-dark"]};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radii.lg};
  display: flex;
  padding: ${(props) => props.theme.spacing.xs};
  height: ${(props) => props.theme.sizes.iconLg};
  width: ${(props) => props.theme.sizes.iconLg};

  svg {
    height: 100%;
    color: white;
    width: 100%;
    box-shadow: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.xxs}
      ${(props) => props.theme.spacing.md}${(props) => props.theme.primary};
  }
`;

export const BrandName = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme["font-sizes"].xl};
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  list-style: none;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: ${props => props.theme.breakpoints.tablet}px){
    width: auto;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

export const NavItem = styled.div<{
  $isActive: boolean;
  $isCollapsed: boolean;
}>`
  a {
    align-items: center;
    background-color: ${(props) => (props.$isActive ? props.theme["bg-light"] : "transparent")};
    border-radius: ${(props) => props.theme.radii.sm};
    color: ${(props) => (props.$isActive ? props.theme.primary : props.theme["text-muted"])};
    display: flex;
    font-size: ${(props) => props.theme["font-sizes"].md};
    font-weight: 600;
    gap: ${(props) => (props.$isCollapsed ? "0" : props.theme.spacing.xs)};
    justify-content: ${(props) => (props.$isCollapsed ? "center" : "flex-start")};
    padding: ${(props) =>
      props.$isCollapsed ? `${props.theme.spacing.xs}` : `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
    text-decoration: none;
    width: 100%;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
  }

  span {
    display: ${props => props.$isCollapsed?"none":"inliner"};
  }

  a:hover {
    background-color: ${(props) => props.theme["bg-light"]};
    color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.text)};
  }

  svg {
    flex-shrink: 0;
    height: ${(props) => props.theme.sizes.iconSm};
    width: ${(props) => props.theme.sizes.iconSm};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    a {
      border-radius: 999px;
      position: relative;
      width: 60px;
      height: 60px;
      margin: -${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm} 0px ${props => props.theme.spacing.sm};
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span {
      position: absolute;
      display: inline;
      left: 50%;
      top: 110%;
      transform: translate(-50%, -50%);
    }
  }
`;
