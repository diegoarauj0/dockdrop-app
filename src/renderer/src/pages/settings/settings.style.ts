import styled from "styled-components";

export const Settings = styled.div`
  background: ${({ theme }) => theme["bg-dark"]};
  padding: ${({ theme }) => theme.spacing.xl};
  justify-content: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const SettingsContainer = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.sizes["content-max-width"]};
  width: 100%;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme["font-sizes"].xxl};
  font-weight: 700;
  width: 100%;
  color: ${({ theme }) => theme.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  letter-spacing: -0.02em;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  border-top: ${({ theme }) => theme["border-widths"].thin} solid ${({ theme }) => theme["highlight"]};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const CardLabel = styled.span`
  display: block;
  font-size: ${({ theme }) => theme["font-sizes"].sm};
  font-weight: 600;
  color: ${({ theme }) => theme["text-muted"]};
  letter-spacing: 0.08em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const GlobeIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.xs};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme["text-muted"]};
  pointer-events: none;
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme["font-sizes"].lg};
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme["bg-light"]};
  border: ${({ theme }) => theme["border-widths"].thin} solid ${({ theme }) => theme["border-muted"]};
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
  border-top: 6px solid ${({ theme }) => theme["text-muted"]};
  pointer-events: none;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ThemeButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme["font-sizes"].lg};
  font-weight: 500;
  color: ${({ theme, $isActive }) => ($isActive ? theme.text : theme["text-muted"])};
  background: ${({ theme, $isActive }) => ($isActive ? theme["bg-light"] : "transparent")};
  border: ${({ theme, $isActive }) =>
    $isActive
      ? `${theme["border-widths"].regular} solid ${theme.primary}`
      : `${theme["border-widths"].thin} solid ${theme["border-muted"]}`};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    margin-right: ${props => props.theme.spacing.xs};
  }

  &:hover {
    border-color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.border)};
    color: ${({ theme }) => theme.text};
  }
`;
