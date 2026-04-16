import styled from "styled-components";

export const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`;

export const Dialog = styled.div`
  background: ${(props) => props.theme.bg};
  border: ${(props) => props.theme.border_widths.thin} solid ${(props) => props.theme.border_muted};
  border-radius: ${(props) => props.theme.radii.lg};
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  min-width: 300px;
  width: 90%;
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  padding: ${(props) => props.theme.spacing.md};
  position: relative;
`;

export const IconWrapper = styled.div`
  align-items: center;
  color: ${(props) => props.theme.danger};
  display: flex;
  justify-content: center;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.font_sizes.lg};
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing.sm};
`;

export const CloseButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.text_muted};
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: absolute;
  right: ${(props) => props.theme.spacing.md};
  top: ${(props) => props.theme.spacing.md};

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

export const Content = styled.div`
  padding: 0 ${(props) => props.theme.spacing.md};
`;

export const Message = styled.p`
  color: ${(props) => props.theme.text_muted};
  font-size: ${(props) => props.theme.font_sizes.sm};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${(props) => props.theme.spacing.md};
  gap: ${(props) => props.theme.spacing.sm};
`;

export const Button = styled.button<{ $variant: string }>`
  border: none;
  border-radius: ${(props) => props.theme.radii.md};
  cursor: pointer;
  font-size: ${(props) => props.theme.font_sizes.sm};
  font-weight: 700;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  text-transform: uppercase;
  transition: 0.2s;

  ${(props) =>
    props.$variant === "danger"
      ? `
    background: ${props.theme.danger};
    color: ${props.theme.bg};

    &:hover {
      background: ${props.theme.danger_hover};
    }
  `
      : `
    background: ${props.theme.bg_light};
    color: ${props.theme.text};

    &:hover {
      background: ${props.theme.bg_dark};
    }
  `}
`;
