import styled from "styled-components";

export const Card = styled.article<{ $status: "active" | "inactive" }>`
  background: linear-gradient(${(props) => `${props.theme["bg-light"]}, ${props.theme.bg}`});
  border-top: 1px solid ${(props) => props.theme["highlight"]};
  border-radius: 14px;
  display: flex;
  gap: 14px;
  padding: 14px 16px;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const Grip = styled.div`
  align-content: center;
  min-width: 20px;
  cursor: grab;

  svg {
    color: ${(props) => props.theme.text};
    height: 25px;
    width: 25px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const TitleGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  min-width: 0;
`;

export const IconWrapper = styled.div<{ $status: "active" | "inactive" }>`
  align-items: center;
  background-color: ${(props) => props.theme["bg-dark"]};
  border: 1px solid ${(props) => (props.$status === "active" ? props.theme.success : props.theme.danger)};
  border-radius: 10px;
  color: ${(props) => (props.$status === "active" ? props.theme.success : props.theme.danger)};
  display: flex;
  flex-shrink: 0;
  height: 34px;
  justify-content: center;
  width: 34px;
`;

export const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const Name = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Image = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: 0.7rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

export const ActionLink = styled.button<{ $tone: "neutral" | "danger" }>`
  transition: 0.3s;
  background: transparent;
  border: none;
  color: ${(props) => (props.$tone === "danger" ? props.theme.danger : props.theme["text-muted"])};
  cursor: pointer;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bg};
  text-transform: uppercase;
  padding: 3px 12px;
  border-radius: 12px;

  &:hover {
    transition: 0.1s;
    transform: translate(0px, -2px);
  }

  svg {
    margin-left: 5px;
  }
`;

export const StatusDot = styled.span<{ $status: "active" | "inactive" }>`
  background-color: ${(props) => (props.$status === "active" ? props.theme.success : props.theme.danger)};
  border-radius: 999px;
  display: block;
  height: 8px;
  width: 8px;
`;

export const Metrics = styled.div`
  border-top: 1px solid ${(props) => props.theme["border-muted"]};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 10px 2px;
  text-align: center;

  & + & {
    border-left: 1px solid ${(props) => props.theme["border-muted"]};
  }

  @media (max-width: 560px) {
    & + & {
      border-left: none;
      border-top: 1px solid ${(props) => props.theme["border-muted"]};
    }
  }
`;

export const MetricLabel = styled.span`
  color: ${(props) => props.theme["text-muted"]};
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const MetricValue = styled.strong`
  color: ${(props) => props.theme.text};
  font-size: 0.78rem;
  font-weight: 700;
`;
