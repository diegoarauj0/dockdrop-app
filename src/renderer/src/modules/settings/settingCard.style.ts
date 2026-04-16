import styled from "styled-components";
import { slideUpFadeAnimation } from "../theme/keyFrames";

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  border-top: ${({ theme }) => theme.border_widths.thin} solid ${({ theme }) => theme["highlight"]};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  animation: ${slideUpFadeAnimation} 0.5s;
`;

export const CardLabel = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font_sizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.text_muted};
  letter-spacing: 0.08em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Button = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font_sizes.lg};
  font-weight: 500;
  color: ${({ theme, $isActive }) => ($isActive ? theme.text : theme.text_muted)};
  background: ${({ theme, $isActive }) => ($isActive ? theme.bg_light : "transparent")};
  border: ${({ theme, $isActive }) =>
    $isActive
      ? `${theme.border_widths.regular} solid ${theme.primary}`
      : `${theme.border_widths.thin} solid ${theme.border_muted}`};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    margin-right: ${(props) => props.theme.spacing.xs};
  }

  &:hover {
    border-color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.border)};
    color: ${({ theme }) => theme.text};
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SelectIconContainer = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.xs};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_muted};
  pointer-events: none;
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.font_sizes.lg};
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg_light};
  border: ${({ theme }) => theme.border_widths.thin} solid ${({ theme }) => theme.border_muted};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  appearance: none;

  &:hover {
    border-color: ${({ theme }) => theme.border};
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  option {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
  }
`;

export const SelectArrow = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid ${({ theme }) => theme.text_muted};
  pointer-events: none;
`;
