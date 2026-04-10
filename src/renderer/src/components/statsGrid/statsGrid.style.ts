import styled from "styled-components";

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.article`
  background: linear-gradient(${(props) => `${props.theme["bg-light"]}, ${props.theme.bg}`});
  border-top: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme.highlight};
  border-radius: ${(props) => props.theme.radii.lg};
  min-height: ${(props) => props.theme.sizes["stat-card-min-height"]};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.md};
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const StatIcon = styled.div<{
  $accent: "primary" | "success" | "danger";
}>`
  background-color: ${(props) => props.theme["bg-dark"]};
  border: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme[props.$accent]};
  border-radius: ${(props) => props.theme.radii.md};
  color: ${(props) => props.theme[props.$accent]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xs};
  height: ${(props) => props.theme.sizes.iconLg};
  width: ${(props) => props.theme.sizes.iconLg};
  box-shadow: 0 0 ${(props) => props.theme.spacing.xxs} ${(props) => props.theme[props.$accent]};

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const StatHighlight = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: ${(props) => props.theme["font-sizes"].sm};
  font-weight: 700;
  letter-spacing: 0.03em;
  text-align: right;
  text-transform: uppercase;
`;

export const StatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xxs};
`;

export const StatLabel = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: ${(props) => props.theme["font-sizes"].md};
  font-weight: 600;
`;

export const StatValue = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme["font-sizes"].xxl};
  font-weight: 800;
  letter-spacing: -0.04em;
`;
