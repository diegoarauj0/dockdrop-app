import { formatBytes, getCPUPercent, getMemoryUsage } from "../../helpers/metric.helper";
import { useDeleteContainer } from "../../hooks/reactQuery/useDeleteContainer";
import { useContainerStats } from "../../providers/useContainerStats";
import { ConfirmDialog } from "../confirmDialog/confirmDialog";
import { Box, GripVertical, Info, Trash } from "lucide-react";
import * as S from "./containerCard.style";
import { ContainerInfo } from "dockerode";
import { useState } from "react";

export function ContainerCard({ Names, Image, State, Id, Status }: ContainerInfo): React.ReactNode {
  const { containerStats } = useContainerStats();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate } = useDeleteContainer();

  const stat = containerStats.find(({ id }) => id === Id);
  const containerName = Names[0].replace("/", "");

  const handleDelete = async (): Promise<void> => {
    mutate(Id);
  };

  return (
    <>
      <S.Card $state={State}>
        <S.Grip aria-hidden="true">
          <GripVertical />
        </S.Grip>

        <S.Content>
          <S.Header>
            <S.TitleGroup>
              <S.IconWrapper $state={State}>
                <Box size={16} />
              </S.IconWrapper>

              <S.TitleText>
                <S.Name>{containerName}</S.Name>
                <S.Image>{Image}</S.Image>
              </S.TitleText>
            </S.TitleGroup>

            <S.StatusContainer>
              <S.StatusDot $state={State} />
              <S.StatusText $state={State}>{State}</S.StatusText>
            </S.StatusContainer>

            <S.Actions>
              <S.ActionLink $style="neutral" type="button">
                About <Info />
              </S.ActionLink>

              <S.ActionLink $style="danger" type="button" onClick={() => setShowDeleteDialog(true)}>
                Delete <Trash />
              </S.ActionLink>
            </S.Actions>
          </S.Header>

          <S.Metrics>
            <S.Metric>
              <S.MetricLabel>CPU</S.MetricLabel>
              <S.MetricValue>{stat ? getCPUPercent(stat).toFixed(2) + "%" : "-"}</S.MetricValue>
            </S.Metric>

            <S.Metric>
              <S.MetricLabel>RAM</S.MetricLabel>
              <S.MetricValue>
                {stat ? (
                  <>
                    {formatBytes(getMemoryUsage(stat).used)} / {formatBytes(getMemoryUsage(stat).limit)}
                    <br />
                    {getMemoryUsage(stat).percent.toFixed(2) + "%"}
                  </>
                ) : (
                  "-"
                )}
              </S.MetricValue>
            </S.Metric>

            <S.Metric>
              <S.MetricLabel>Uptime</S.MetricLabel>
              <S.MetricValue>{Status}</S.MetricValue>
            </S.Metric>
          </S.Metrics>
        </S.Content>
      </S.Card>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Container"
        message={`Are you sure you want to delete "${containerName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
