import styled from "styled-components";

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.article`
  background: linear-gradient(${(props) => `${props.theme["bg-light"]}, ${props.theme.bg}`});
  border-top: 1px solid ${(props) => props.theme.highlight};
  border-radius: 14px;
  min-height: 126px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StatIcon = styled.div<{ $accent: "primary" | "success" | "danger" }>`
  background-color: ${(props) => props.theme["bg-dark"]};
  border: 1px solid ${(props) => props.theme[props.$accent]};
  border-radius: 10px;
  color: ${(props) => props.theme[props.$accent]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  height: 50px;
  width: 50px;
  box-shadow: 0px 0px 5px ${(props) => props.theme[props.$accent]};

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const StatHighlight = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-align: right;
  text-transform: uppercase;
`;

export const StatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatLabel = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: 0.92rem;
  font-weight: 600;
`;

export const StatValue = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.04em;
`;
