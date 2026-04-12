import { useStartContainer } from "../../hooks/reactQuery/useStartContainer";
import { useStopContainer } from "../../hooks/reactQuery/useStopContainer";
import { useDeleteContainer } from "../../hooks/reactQuery/useDeleteContainer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import * as S from "./containerAreas.style";
import { ContainerInfo } from "dockerode";
import { ReactNode, useState } from "react";
import { ConfirmDialog } from "../confirmDialog/confirmDialog";
import { Trash2, Info } from "lucide-react";
import { ContainerListArea } from "../containerListArea/containerListArea";
import { BaseContainerArea } from "../baseContainerArea/baseContainerArea";
import { useTheme } from "../../providers/useTheme";

interface IContainerData {
  containerId: string;
  containerName: string;
  currentState: string;
}

export function ContainerAreasComponent({ containers }: { containers: ContainerInfo[] }): ReactNode {
  const { mutate: startMutate } = useStartContainer();
  const { mutate: stopMutate } = useStopContainer();
  const { mutate: deleteMutate } = useDeleteContainer();

  const { currentTheme } = useTheme();

  const activeContainers = containers.filter(({ State }) => State === "running");
  const inactiveContainers = containers.filter(({ State }) => State === "exited");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [containerToDelete, setContainerToDelete] = useState<IContainerData | null>(null);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over) {
      const containerData = active.data.current as IContainerData;
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
        <BaseContainerArea
          minHeight={currentTheme.sizes["action-area-height"]}
          borderColor={currentTheme.danger}
          id="delete-area"
          title="Delete Container"
          icon={Trash2}
        />
        <BaseContainerArea
          minHeight={currentTheme.sizes["action-area-height"]}
          borderColor={currentTheme.info}
          id="inspect-area"
          title="Inspect Container"
          icon={Info}
        />
      </S.ActionAreas>

      <S.ContainerAreas>
        <ContainerListArea
          borderColor={currentTheme.success}
          id="active-area"
          title="Active Containers"
          variant="active"
          containers={activeContainers}
        />
        <ContainerListArea
          borderColor={currentTheme.danger}
          id="inactive-area"
          title="Inactive Containers"
          variant="inactive"
          containers={inactiveContainers}
        />
      </S.ContainerAreas>

      <ConfirmDialog
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
