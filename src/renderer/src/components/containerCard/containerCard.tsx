import { Box, GripVertical, Info, Trash } from "lucide-react";
import * as S from "./containerCard.style";

type ContainerCardProps = {
  container: {
    name: string;
    image: string;
    cpu: string;
    ram: string;
    uptime: string;
  };
  status: "active" | "inactive";
};

export function ContainerCard({ container, status }: ContainerCardProps): React.ReactNode {
  return (
    <S.Card $status={status}>
      <S.Grip aria-hidden="true">
        <GripVertical />
      </S.Grip>

      <S.Content>
        <S.Header>
          <S.TitleGroup>
            <S.IconWrapper $status={status}>
              <Box size={16} />
            </S.IconWrapper>

            <S.TitleText>
              <S.Name>{container.name}</S.Name>
              <S.Image>{container.image}</S.Image>
            </S.TitleText>
          </S.TitleGroup>

          <S.Actions>
            <S.ActionLink $tone="neutral" type="button">
              About <Info />
            </S.ActionLink>
            <S.ActionLink $tone="danger" type="button">
              Delete <Trash />
            </S.ActionLink>
            <S.StatusDot $status={status} />
          </S.Actions>
        </S.Header>

        <S.Metrics>
          <S.Metric>
            <S.MetricLabel>CPU</S.MetricLabel>
            <S.MetricValue>{container.cpu}</S.MetricValue>
          </S.Metric>
          <S.Metric>
            <S.MetricLabel>RAM</S.MetricLabel>
            <S.MetricValue>{container.ram}</S.MetricValue>
          </S.Metric>
          <S.Metric>
            <S.MetricLabel>Uptime</S.MetricLabel>
            <S.MetricValue>{container.uptime}</S.MetricValue>
          </S.Metric>
        </S.Metrics>
      </S.Content>
    </S.Card>
  );
}
