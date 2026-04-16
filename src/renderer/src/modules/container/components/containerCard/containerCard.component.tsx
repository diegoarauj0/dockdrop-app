import { useContainerStats } from "../../providers/containerStats.context";
import { CSSProperties } from "styled-components";
import { Box, GripVertical } from "lucide-react";
import * as S from "./containerCard.style";
import { ContainerInfo } from "dockerode";
import { containerMetricsService } from "../../containerMetrics.service";
import { useTranslation } from "react-i18next";

interface InterfaceContainerCardProps extends ContainerInfo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: any;
  style?: CSSProperties;
  ref?: (element: HTMLElement) => void;
}

export function ContainerCardComponent(props: InterfaceContainerCardProps): React.ReactNode {
  const { Names, Image, State, Id, Status, ref, style, attributes } = props;

  const { containerStats } = useContainerStats();
  const { t } = useTranslation("container");

  const stat = containerStats.find(({ id }) => id === Id);
  const containerName = Names[0].replace("/", "");

  return (
    <S.Card ref={ref} style={style} $state={State}>
      <S.Grip {...attributes}>
        <GripVertical />
      </S.Grip>

      <S.Content>
        <S.Header>
          <S.TitleGroup>
            <S.IconWrapper $state={State}>
              <Box size={32} />
            </S.IconWrapper>

            <S.TitleText>
              <S.Name>{containerName}</S.Name>
              <S.Image>{Image}</S.Image>
            </S.TitleText>
          </S.TitleGroup>

          <S.StatusContainer>
            <S.StatusDot $state={State} />
            <S.StatusText $state={State}>{t(`status.${State}`)}</S.StatusText>
          </S.StatusContainer>
        </S.Header>

        <S.Metrics>
          <S.Metric>
            <S.MetricLabel>{t("metrics.cpu")}</S.MetricLabel>
            <S.MetricValue>{stat ? containerMetricsService.getCPUPercent(stat).toFixed(2) + "%" : "-"}</S.MetricValue>
          </S.Metric>

          <S.Metric>
            <S.MetricLabel>{t("metrics.ram")}</S.MetricLabel>
            <S.MetricValue>
              {stat ? (
                <>
                  {containerMetricsService.formatBytes(containerMetricsService.getMemoryUsage(stat).used)} /{" "}
                  {containerMetricsService.formatBytes(containerMetricsService.getMemoryUsage(stat).limit)}
                  <br />
                  {containerMetricsService.getMemoryUsage(stat).percent.toFixed(2) + "%"}
                </>
              ) : (
                "-"
              )}
            </S.MetricValue>
          </S.Metric>

          <S.Metric>
            <S.MetricLabel>{t("metrics.uptime")}</S.MetricLabel>
            <S.MetricValue>{Status}</S.MetricValue>
          </S.Metric>
        </S.Metrics>
      </S.Content>
    </S.Card>
  );
}
