import styled from "styled-components";

export const Cards = styled.div`
  gap: ${(props) => props.theme.spacing.md};
  flex-direction: column;
  display: flex;
`;

export const Placeholder = styled.div`
  color: ${(props) => props.theme.text_muted};
  font-size: ${(props) => props.theme.font_sizes.sm};
  text-align: center;
  padding: ${(props) => props.theme.spacing.lg};
`;

export const Badge = styled.span`
  align-items: center;
  background-color: ${(props) => props.theme.bg};
  border: ${(props) => props.theme.border_widths.thin} solid;
  border-radius: ${(props) => props.theme.radii.pill};
  color: ${(props) => props.theme.text_muted};
  display: inline-flex;
  font-size: ${(props) => props.theme.font_sizes.sm};
  font-weight: 700;
  height: ${(props) => props.theme.sizes.badge};
  justify-content: center;
  min-width: ${(props) => props.theme.sizes.badge};
  padding: 0 ${(props) => props.theme.spacing.xs};
`;
