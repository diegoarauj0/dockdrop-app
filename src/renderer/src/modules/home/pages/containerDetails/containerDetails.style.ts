import { slideUpFadeAnimation } from "../../../theme/keyFrames";
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.lg};
  animation: ${slideUpFadeAnimation} 0.3s ease-out;
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
    padding: ${(props) => props.theme.spacing.md};
  }
`;

export const BackButton = styled.button`
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

  background-color: ${(props) => props.theme.bg_light};
  border: ${(props) => props.theme.border_widths.thin} solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  padding: none;
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

export const StatusBadge = styled.span<{ $state: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.radii.pill};
  font-size: ${(props) => props.theme.font_sizes.sm};
  font-weight: 500;
  background-color: ${(props) => (props.$state === "running" ? props.theme.success + "20" : props.theme.bg_light)};
  color: ${(props) => (props.$state === "running" ? props.theme.success : props.theme.text_muted)};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.radii.sm};
  padding: ${(props) => props.theme.spacing.lg};
  border-top: ${(props) => props.theme.border_widths.thin} solid ${(props) => props.theme.highlight};
  background: linear-gradient(${(props) => `${props.theme.bg_light}, ${props.theme.bg}`});
  width: 100%;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.radii.sm};
  background-color: ${(props) => props.theme.bg};
`;

export const InfoItemIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};

  svg {
    width: ${(props) => props.theme.sizes.icon_lg};
    height: ${(props) => props.theme.sizes.icon_lg};
  }
`;

export const InfoItemTitle = styled.h3`
  color: ${(props) => props.theme.text_muted};
  font-size: ${(props) => props.theme.font_sizes.sm};
  font-weight: 500;
`;

export const InfoItemValue = styled.p`
  color: ${(props) => props.theme.text};
`;

export const SectionTitle = styled.h2`
  width: 100%;
  font-size: ${(props) => props.theme.font_sizes.md};
  font-weight: 600;
  color: ${(props) => props.theme.text};
  margin-top: ${(props) => props.theme.spacing.md};
  padding-bottom: ${(props) => props.theme.spacing.sm};
  border-bottom: ${(props) => props.theme.border_widths.thin} solid ${(props) => props.theme.highlight};
`;
