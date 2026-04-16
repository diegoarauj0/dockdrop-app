import { fadeScaleInAnimation } from "../../../theme/keyFrames";
import styled from "styled-components";

export const BlueprintPanel = styled.section`
  animation: ${fadeScaleInAnimation} 0.55s ease;
  min-width: 0;
`;

export const BlueprintFrame = styled.div<{ $active: boolean }>`
  position: relative;
  border: ${(props) => props.theme.border_widths.regular} ${(props) => props.$active?"solid":"dashed"} ${(props) => props.theme.border_muted};
  border-radius: 32px;
  box-shadow: 0px 0px 10px ${props => props.$active?props.theme.border_muted:"transparent"};
  background: radial-gradient(circle at top, ${(props) => `${props.theme.bg} 0%, ${props.theme.bg_dark} 72%`});
  padding: 72px ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.xl};
  min-height: 100%;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: 72px ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.md};
    border-radius: ${(props) => props.theme.radii.lg};
  }
`;

export const BlueprintBadge = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.primary};
  color: white;
  border-radius: ${(props) => props.theme.radii.pill};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.font_sizes.md};
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const BlueprintCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  max-width: 760px;
  margin: 0 auto;
`;
