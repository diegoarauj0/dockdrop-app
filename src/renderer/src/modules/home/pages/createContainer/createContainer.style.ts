import { slideUpFadeAnimation } from "../../../theme/keyFrames";
import styled, { css } from "styled-components";

export const CreateContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  min-height: 100%;
`;

export const TopBar = styled.header`
  width: 100%;
  border: ${(props) => props.theme.border_widths.strong} solid ${(props) => props.theme.bg_dark};
  background-color: ${(props) => props.theme.bg};
  border-radius: ${(props) => props.theme.radii.md};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  display: grid;
  top: 0%;
  z-index: 100;
  position: sticky;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  animation: ${slideUpFadeAnimation} 0.5s;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-template-columns: auto 1fr;
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const actionButtonStyles = css`
  border: none;
  border-radius: ${(props) => props.theme.radii.md};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
  font-size: ${(props) => props.theme.font_sizes.md};
  font-weight: 700;
  min-height: ${(props) => props.theme.sizes.control_min_height};
  padding: 0 ${(props) => props.theme.spacing.md};
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    opacity 0.2s ease;

  &:active {
    transform: translateY(1px);
  }
`;

export const BackButton = styled.button`
  ${actionButtonStyles};
  background-color: ${(props) => props.theme.bg_light};
  border: ${(props) => props.theme.border_widths.thin} solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  padding: 0;
  width: ${(props) => props.theme.sizes.control_min_height};
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xxs};
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.font_sizes.xl};
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const CompleteButton = styled.button<{ $disabled: boolean }>`
  ${actionButtonStyles};
  background-color: ${(props) => props.theme.success};
  color: white;
  filter: opacity(${props => props.$disabled?"50%":"100%"});

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 1 / -1;
  }
`;

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: ${(props) => props.theme.spacing.lg};
  min-height: 0;
  flex: 1;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.wide}px) {
    grid-template-columns: 1fr;
  }
`;
