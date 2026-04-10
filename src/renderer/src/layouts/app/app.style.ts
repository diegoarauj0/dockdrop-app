import styled from "styled-components";

type SidebarStateProps = {
  $isCollapsed: boolean;
};

export const AppLayout = styled.main`
  background-color: ${(props) => props.theme["bg-dark"]};
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    overflow-y: hidden;
    flex-direction: column-reverse;
  }
`;

export const SidebarContent = styled.div<SidebarStateProps>`
  height: 100%;
  position: sticky;
  left: 0%;
  top: 0%;
  min-height: 100vh;
  padding: ${(props) => props.theme.spacing.xs};
  transition: width 0.2s ease;
  width: ${(props) => (props.$isCollapsed ? props.theme.sizes["sidebar-collapsed-width"] : props.theme.sizes["sidebar-width"])};

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    min-height: 0px;
    width: 100%;
    padding: ${props => props.theme.spacing.xxs};
    height: 100px;
    position: relative;
  }
`;

export const MainContent = styled.div<SidebarStateProps>`
  transition: width 0.2s ease;
  width: ${(props) =>
    `calc(100vw - ${props.$isCollapsed ? props.theme.sizes["sidebar-collapsed-width"] : props.theme.sizes["sidebar-width"]})`};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.md};
  height: 100vh;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 100%;
    padding: ${props => props.theme.spacing.xxs};
    height: calc(100vh - 100px);
    overflow-y: auto;
  }
`;
