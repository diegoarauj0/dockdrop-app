import styled from "styled-components";

export const Card = styled.article<{ $status: "active" | "inactive" }>`
  background: linear-gradient(${(props) => `${props.theme["bg-light"]}, ${props.theme.bg}`});
  border-top: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme["highlight"]};
  border-radius: ${(props) => props.theme.radii.lg};
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.compact}px) {
    flex-direction: column;
  }
`;

export const Grip = styled.div`
  align-content: center;
  min-width: ${(props) => props.theme.spacing.lg};
  cursor: grab;

  svg {
    color: ${(props) => props.theme.text};
    height: ${(props) => props.theme.sizes.iconSm};
    width: ${(props) => props.theme.sizes.iconSm};
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  min-width: 0;
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const TitleGroup = styled.div`
  align-items: center;
  display: flex;
  gap: ${(props) => props.theme.spacing.xs};
  min-width: 0;
`;

export const IconWrapper = styled.div<{ $status: "active" | "inactive" }>`
  align-items: center;
  background-color: ${(props) => props.theme["bg-dark"]};
  border: ${(props) => props.theme["border-widths"].thin} solid
    ${(props) => (props.$status === "active" ? props.theme.success : props.theme.danger)};
  border-radius: ${(props) => props.theme.radii.md};
  color: ${(props) => (props.$status === "active" ? props.theme.success : props.theme.danger)};
  display: flex;
  flex-shrink: 0;
  height: ${(props) => props.theme.sizes.iconMd};
  justify-content: center;
  width: ${(props) => props.theme.sizes.iconMd};
`;

export const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xxs};
  min-width: 0;
`;

export const Name = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme["font-sizes"].md};
  font-weight: 700;
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Image = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: ${(props) => props.theme["font-sizes"].sm};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const ActionLink = styled.button<{ $tone: "neutral" | "danger" }>`
  transition: 0.3s;
  background: transparent;
  border: none;
  color: ${(props) => (props.$tone === "danger" ? props.theme.danger : props.theme["text-muted"])};
  cursor: pointer;
  font-size: ${(props) => props.theme["font-sizes"].xs};
  font-weight: 700;
  letter-spacing: 0.04em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bg};
  text-transform: uppercase;
  padding: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.radii.md};

  &:hover {
    transition: 0.1s;
    transform: translateY(-2);
  }

  svg {
    margin-left: ${(props) => props.theme.spacing.xxs};
  }
`;

export const StatusDot = styled.span<{ $status: "active" | "inactive" }>`
  background-color: ${(props) => (props.$status === "active" ? props.theme.success : props.theme.danger)};
  border-radius: ${(props) => props.theme.radii.pill};
  display: block;
  height: ${(props) => props.theme.sizes.dot};
  width: ${(props) => props.theme.sizes.dot};
`;

export const Metrics = styled.div`
  border-top: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme["border-muted"]};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${(props) => props.theme.breakpoints.compact}px) {
    grid-template-columns: 1fr;
  }
`;

export const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xxs};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.xxs};
  text-align: center;

  & + & {
    border-left: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme["border-muted"]};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.compact}px) {
    & + & {
      border-left: none;
      border-top: ${(props) => props.theme["border-widths"].thin} solid ${(props) => props.theme["border-muted"]};
    }
  }
`;

export const MetricLabel = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: ${(props) => props.theme["font-sizes"].xs};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const MetricValue = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme["font-sizes"].sm};
  font-weight: 700;
`;
