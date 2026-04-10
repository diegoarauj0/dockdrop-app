import styled from "styled-components";

export const Section = styled.section`
  background-color: ${(props) => props.theme["bg-dark"]};
  border: ${(props) => props.theme["border-widths"].regular} dashed ${(props) => props.theme.success};
  border-radius: ${(props) => props.theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  min-height: ${(props) => props.theme.sizes["section-min-height"]};
  padding: ${(props) => props.theme.spacing.md};
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme["font-sizes"].lg};
  font-weight: 700;
  margin: 0;
`;

export const Count = styled.span`
  align-items: center;
  background-color: ${(props) => props.theme.bg};
  border: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme.success};
  border-radius: ${(props) => props.theme.radii.pill};
  color: ${(props) => props.theme["text-muted"]};
  display: inline-flex;
  font-size: ${(props) => props.theme["font-sizes"].sm};
  font-weight: 700;
  height: ${(props) => props.theme.sizes.badge};
  justify-content: center;
  min-width: ${(props) => props.theme.sizes.badge};
  padding: 0 ${(props) => props.theme.spacing.xs};
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;
