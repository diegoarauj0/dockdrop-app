import styled from "styled-components";

export const SideBar = styled.main`
  background-color: ${(props) => props.theme["bg"]};
  flex-direction: column;
  border-radius: 12px;
  padding: 14px 10px;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Header = styled.header`
  padding: 4px 4px 18px;
  align-items: center;
  display: flex;
  gap: 10px;
`;

export const BrandIcon = styled.div`
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme["bg-dark"]};
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  display: flex;
  padding: 6px;
  height: 50px;
  width: 50px;

  svg {
    height: 100%;
    color: white;
    width: 100%;
    box-shadow: 3px 3px 15px ${(props) => props.theme.primary};
  }
`;

export const BrandName = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const Nav = styled.nav`
  flex: 1;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
`;

export const NavItem = styled.div<{ $isActive: boolean }>`
  a {
    align-items: center;
    background-color: ${(props) => (props.$isActive ? props.theme["bg-light"] : "transparent")};
    border-radius: 8px;
    color: ${(props) => (props.$isActive ? props.theme.primary : props.theme["text-muted"])};
    display: flex;
    font-size: 1.4rem;
    font-weight: 600;
    gap: 10px;
    padding: 10px 12px;
    font-size: 18px;
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
  }

  a:hover {
    background-color: ${(props) => props.theme["bg-light"]};
    color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.text)};
  }

  svg {
    flex-shrink: 0;
    height: 22px;
    width: 22px;
  }
`;
