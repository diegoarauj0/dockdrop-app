import { useMutationDeleteContainer } from "../../queries/useMutationDeleteContainer";
import { BaseContainerAreaComponent } from "../baseContainerArea/baseContainerArea";
import { ContainerListAreaComponent } from "../containerListArea/containerListArea";
import { useMutationStartContainer } from "../../queries/useMutationStartContainer";
import { useMutationStopContainer } from "../../queries/useMutationStopContainer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTheme } from "../../../theme/theme.context";
import * as S from "./containerAreas.style";
import { ReactNode, useState } from "react";
import { Trash2, Info } from "lucide-react";
import { ContainerInfo } from "dockerode";
import { ConfirmDialogComponent } from "../../../shared/components/confirmDialog/confirmDialog";

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
          title="Delete Container"
          icon={Trash2}
        />
        <BaseContainerAreaComponent
          minHeight={currentTheme.sizes["action-area-height"]}
          borderColor={currentTheme.info}
          id="inspect-area"
          title="Inspect Container"
          icon={Info}
        />
      </S.ActionAreas>

      <S.ContainerAreas>
        <ContainerListAreaComponent
          borderColor={currentTheme.success}
          id="active-area"
          title="Active Containers"
          variant="active"
          containers={activeContainers}
        />
        <ContainerListAreaComponent
          borderColor={currentTheme.danger}
          id="inactive-area"
          title="Inactive Containers"
          variant="inactive"
          containers={inactiveContainers}
        />
      </S.ContainerAreas>

      <ConfirmDialogComponent
        open={showDeleteDialog}
        title="Delete Container"
        message={`Are you sure you want to delete "${containerToDelete?.containerName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </DndContext>
  );
}
