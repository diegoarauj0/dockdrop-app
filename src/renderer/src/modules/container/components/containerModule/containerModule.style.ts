import styled, { css } from "styled-components";

interface InterfaceFieldGridProps {
  $columns: 1 | 2;
}

interface InterfaceContainerModuleCardProps {
  $variant: "available" | "selected";
  $disabled?: boolean;
}

export const ContainerModuleCard = styled.article<InterfaceContainerModuleCardProps>`
  background: ${({ theme, $variant }) =>
    $variant === "selected" ? `linear-gradient(180deg, ${theme.bg_light} 0%, ${theme.bg} 100%)` : theme.bg_light};
  border: ${({ theme, $variant }) =>
    $variant === "available"
      ? `${theme.border_widths.thin} solid ${theme.border_muted}`
      : `${theme.border_widths.thin} solid transparent`};
  border-top-color: ${({ theme, $variant }) => ($variant === "selected" ? theme.highlight : theme.border_muted)};
  border-radius: ${(props) => props.theme.radii.lg};
  box-shadow: ${({ theme, $variant }) => ($variant === "selected" ? `0 20px 40px ${theme.bg_dark}66` : "none")};
  padding: ${(props) => props.theme.spacing.md};
  display: flex;
  filter: opacity(${(props) => (props.$disabled ? "50%" : "100%")});
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.md};
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const iconBaseStyles = css`
  border-radius: ${(props) => props.theme.radii.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModuleLeadingArea = styled.div<InterfaceContainerModuleCardProps>`
  ${iconBaseStyles};
  background-color: ${({ theme, $variant }) => ($variant === "selected" ? `${theme.primary}22` : theme.bg)};
  border: ${({ theme, $variant }) => ($variant === "available" ? `${theme.border_widths.thin} solid ${theme.border}` : "none")};
  color: ${(props) => props.theme.primary};
  height: ${(props) => props.theme.sizes.icon_md};
  width: ${(props) => props.theme.sizes.icon_md};
`;

export const ModuleTitle = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.font_sizes.lg};
  font-weight: 700;
`;

export const DragHandle = styled.div`
  color: ${(props) => props.theme.text_muted};
  display: flex;
  cursor: grab;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.text_muted};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xxs};
`;

export const FieldGrid = styled.div<InterfaceFieldGridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, minmax(0, 1fr));
  gap: ${(props) => props.theme.spacing.md};

  @media screen and (max-width: ${(props) => props.theme.breakpoints.compact}px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const FieldLabel = styled.span`
  color: ${(props) => props.theme.text_muted};
  font-size: ${(props) => props.theme.font_sizes.sm};
  font-weight: 700;
  text-transform: uppercase;
`;

export const FieldInput = styled.input<{ $hasError?: boolean }>`
  background-color: ${(props) => props.theme.bg_dark};
  border: ${(props) => props.theme.border_widths.thin} solid
    ${({ theme, $hasError }) => ($hasError ? theme.danger : theme.border_muted)};
  border-radius: ${(props) => props.theme.radii.md};
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.font_sizes.lg};
  min-height: ${(props) => props.theme.sizes.control_min_height};
  outline: none;
  padding: 0 ${(props) => props.theme.spacing.md};

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.danger : theme.primary)};
    box-shadow: 0 0 0 2px ${({ theme, $hasError }) => ($hasError ? `${theme.danger}22` : `${theme.primary}22`)};
  }

  &::placeholder {
    color: ${(props) => props.theme.text_muted};
  }
`;

export const FieldError = styled.span`
  color: ${(props) => props.theme.danger};
  font-size: ${(props) => props.theme.font_sizes.sm};
  line-height: 1.4;
`;
