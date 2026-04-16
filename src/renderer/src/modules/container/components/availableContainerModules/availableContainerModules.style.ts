import { fadeScaleInAnimation } from "../../../theme/keyFrames";
import styled from "styled-components";

export const AvailableModulesPanel = styled.aside`
  background-color: ${(props) => props.theme.bg};
  border-top: ${(props) => props.theme.border_widths.thin} solid ${(props) => props.theme.highlight};
  border-radius: ${(props) => props.theme.radii.lg};
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  min-height: 640px;
  animation: ${fadeScaleInAnimation} 0.45s ease;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.wide}px) {
    min-height: auto;
  }
`;

export const SectionEyebrow = styled.span`
  color: ${(props) => props.theme.text_muted};
  font-size: ${(props) => props.theme.font_sizes.md};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const SectionDescription = styled.p`
  color: ${(props) => props.theme.text_muted};
  font-size: ${(props) => props.theme.font_sizes.md};
  line-height: 1.6;
  max-width: 28ch;
`;

export const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.md};
`;
