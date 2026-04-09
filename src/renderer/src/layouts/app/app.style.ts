import styled from "styled-components";

export const AppLayout = styled.main`
  background-color: ${(props) => props.theme["bg-dark"]};
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const SidebarContent = styled.div`
  height: 100vh;
  width: 300px;
  padding: 6px;
`;

export const MainContent = styled.div`
  width: calc(100vw - 300px);
  padding: 6px 16px;
  height: 100vh;
`;
