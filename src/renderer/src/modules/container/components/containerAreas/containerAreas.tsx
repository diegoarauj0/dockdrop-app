import { ConfirmDialogComponent } from "../../../shared/components/confirmDialog/confirmDialog";
import { useMutationDeleteContainer } from "../../queries/useMutationDeleteContainer";
import { BaseContainerAreaComponent } from "../baseContainerArea/baseContainerArea";
import { ContainerListAreaComponent } from "../containerListArea/containerListArea";
import { useMutationStartContainer } from "../../queries/useMutationStartContainer";
import { useMutationStopContainer } from "../../queries/useMutationStopContainer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import * as S from "./containerAreas.style";
import { ReactNode, useState } from "react";
import { Trash2, Info } from "lucide-react";
import { ContainerInfo } from "dockerode";
import { useTheme } from "../../../theme/providers/theme.context";
import { useTranslation } from "react-i18next";

interface InterfaceContainerData {
  containerId: string;
  containerName: string;
  currentState: string;
}

export function ContainerAreasComponent({ containers }: { containers: ContainerInfo[] }): ReactNode {
  const { mutate: startMutate } = useMutationStartContainer();
  const { mutate: stopMutate } = useMutationStopContainer();
  const { mutate: deleteMutate } = useMutationDeleteContainer();

  const { currentTheme } = useTheme();
  const { t } = useTranslation("container");

  const activeContainers = containers.filter(({ State }) => State === "running");
  const inactiveContainers = containers.filter(({ State }) => State === "exited");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [containerToDelete, setContainerToDelete] = useState<InterfaceContainerData | null>(null);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over) {
      const containerData = active.data.current as InterfaceContainerData;
      const targetArea = over.id;

      if (containerData.currentState === "running" && targetArea === "active-area") return;
      if (containerData.currentState === "exited" && targetArea === "inactive-area") return;

      if (targetArea === "active-area") {
        return startMutate(containerData.containerId);
      }

      if (targetArea === "inactive-area") {
        return stopMutate(containerData.containerId);
      }

      if (targetArea === "delete-area") {
        setContainerToDelete(containerData);
        setShowDeleteDialog(true);
        return;
      }
    }
  };

  const handleConfirmDelete = (): void => {
    if (containerToDelete) {
      deleteMutate(containerToDelete.containerId);
      setShowDeleteDialog(false);
      setContainerToDelete(null);
    }
  };

  const handleCancelDelete = (): void => {
    setShowDeleteDialog(false);
    setContainerToDelete(null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <S.ActionAreas>
        <BaseContainerAreaComponent
          minHeight={currentTheme.sizes["action-area-height"]}
          borderColor={currentTheme.danger}
          id="delete-area"
          title={t("actions.remove")}
          icon={Trash2}
        />
        <BaseContainerAreaComponent
          minHeight={currentTheme.sizes["action-area-height"]}
          borderColor={currentTheme.info}
          id="inspect-area"
          title={t("dialog.inspect")}
          icon={Info}
        />
      </S.ActionAreas>

      <S.ContainerAreas>
        <ContainerListAreaComponent
          borderColor={currentTheme.success}
          id="active-area"
          title={t("metrics.active")}
          variant="active"
          containers={activeContainers}
        />
        <ContainerListAreaComponent
          borderColor={currentTheme.danger}
          id="inactive-area"
          title={t("metrics.inactive")}
          variant="inactive"
          containers={inactiveContainers}
        />
      </S.ContainerAreas>

      <ConfirmDialogComponent
        open={showDeleteDialog}
        title={t("actions.remove")}
        message={`${t("dialog.deleteConfirm")} "${containerToDelete?.containerName}"?`}
        confirmText={t("actions.remove")}
        cancelText={t("dialog.cancel")}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </DndContext>
  );
}
