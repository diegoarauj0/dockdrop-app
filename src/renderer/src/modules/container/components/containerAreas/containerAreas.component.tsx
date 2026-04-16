import { ConfirmDialogComponent } from "../../../shared/components/confirmDialog/confirmDialog.component";
import { useMutationDeleteContainer } from "../../queries/useDeleteContainer.mutation";
import { BaseContainerAreaComponent } from "../baseContainerArea/baseContainerArea.component";
import { ContainerListAreaComponent } from "../containerListArea/containerListArea.component";
import { useMutationStartContainer } from "../../queries/useStartContainer.mutation";
import { useMutationStopContainer } from "../../queries/useStopContainer.mutation";
import { useTheme } from "../../../theme/providers/theme.context";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTranslation } from "react-i18next";
import * as S from "./containerAreas.style";
import { ReactNode, useState } from "react";
import { Trash2, Info } from "lucide-react";
import { ContainerInfo } from "dockerode";
import { toast } from "react-toastify";

interface InterfaceContainerData {
  containerId: string;
  containerName: string;
  currentState: string;
}

export function ContainerAreasComponent({ containers }: { containers: ContainerInfo[] }): ReactNode {
  const { mutate: startMutate } = useMutationStartContainer();
  const { mutate: stopMutate, mutateAsync: stopMutateAsync } = useMutationStopContainer();
  const { mutate: deleteMutate } = useMutationDeleteContainer();

  const { currentTheme } = useTheme();
  const { t } = useTranslation("container");

  const activeContainers = containers.filter(({ State }) => State === "running");
  const inactiveContainers = containers.filter(({ State }) => State === "exited");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [containerToDelete, setContainerToDelete] = useState<InterfaceContainerData | null>(null);

  const deleteContainerNotificationId = (containerId: string): string => `DELETE_CONTAINER_NOTIFICATION-${containerId}`;
  const startContainerNotificationId = (containerId: string): string => `START_CONTAINER_NOTIFICATION-${containerId}`;
  const stopContainerNotificationId = (containerId: string): string => `STOP_CONTAINER_NOTIFICATION-${containerId}`;

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over) {
      const containerData = active.data.current as InterfaceContainerData;
      const targetArea = over.id;

      if (containerData.currentState === "running" && targetArea === "active-area") return;
      if (containerData.currentState === "exited" && targetArea === "inactive-area") return;

      if (targetArea === "active-area") {
        toast.loading(t("notifications.activating", { name: containerData.containerName }), {
          toastId: startContainerNotificationId(containerData.containerId),
          isLoading: true,
        });

        return startMutate(containerData.containerId, {
          onSuccess: () =>
            toast.update(startContainerNotificationId(containerData.containerId), {
              isLoading: false,
              render: t("notifications.activated_success"),
              closeButton: true,
              autoClose: 3000,
              type: "success",
            }),

          onError: () =>
            toast.update(startContainerNotificationId(containerData.containerId), {
              isLoading: false,
              render: t("notifications.activated_error"),
              closeButton: true,
              autoClose: 3000,
              type: "error",
            }),
        });
      }

      if (targetArea === "inactive-area") {
        toast.loading(t("notifications.deactivating", { name: containerData.containerName }), {
          toastId: stopContainerNotificationId(containerData.containerId),
          isLoading: true,
        });

        return stopMutate(containerData.containerId, {
          onSuccess: () =>
            toast.update(stopContainerNotificationId(containerData.containerId), {
              isLoading: false,
              render: t("notifications.deactivated_success"),
              closeButton: true,
              autoClose: 3000,
              type: "success",
            }),

          onError: () =>
            toast.update(stopContainerNotificationId(containerData.containerId), {
              isLoading: false,
              render: t("notifications.deactivated_error"),
              closeButton: true,
              autoClose: 3000,
              type: "error",
            }),
        });
      }

      if (targetArea === "delete-area") {
        setContainerToDelete(containerData);
        setShowDeleteDialog(true);
        return;
      }
    }
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (containerToDelete) {
      toast.loading(t("notifications.deleting", { name: containerToDelete.containerName }), {
        toastId: deleteContainerNotificationId(containerToDelete.containerId),
        isLoading: true,
      });

      if (containerToDelete.currentState === "running") {
        toast.loading(t("notifications.deactivating", { name: containerToDelete.containerName }), {
          toastId: stopContainerNotificationId(containerToDelete.containerId),
          isLoading: true,
        });
        try {
          await stopMutateAsync(containerToDelete.containerId);

          toast.update(stopContainerNotificationId(containerToDelete.containerId), {
            isLoading: false,
            render: t("notifications.deactivated_success"),
            closeButton: true,
            autoClose: 3000,
            type: "success",
          });
        } catch {
          return toast.update(stopContainerNotificationId(containerToDelete.containerId), {
            isLoading: false,
            render: t("notifications.deactivated_error"),
            closeButton: true,
            autoClose: 3000,
            type: "error",
          });
        }
      }

      deleteMutate(containerToDelete.containerId, {
        onSuccess: () =>
          toast.update(deleteContainerNotificationId(containerToDelete.containerId), {
            isLoading: false,
            render: t("notifications.deleted_success"),
            closeButton: true,
            autoClose: 3000,
            type: "success",
          }),

        onError: () =>
          toast.update(deleteContainerNotificationId(containerToDelete.containerId), {
            isLoading: false,
            render: t("notifications.deleted_error"),
            closeButton: true,
            autoClose: 3000,
            type: "error",
          }),
      });
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
          borderColor={currentTheme.danger}
          id="delete-area"
          title={t("actions.remove")}
          icon={Trash2}
        />
        <BaseContainerAreaComponent borderColor={currentTheme.info} id="inspect-area" title={t("dialog.inspect")} icon={Info} />
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
