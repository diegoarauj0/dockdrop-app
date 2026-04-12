import { InactiveContainersArea } from "../inactiveContainersArea/inactiveContainersArea";
import { ActiveContainersArea } from "../activeContainersArea/activeContainersArea";
import { useStartContainer } from "../../hooks/reactQuery/useStartContainer";
import { useStopContainer } from "../../hooks/reactQuery/useStopContainer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import * as S from "./containerAreas.style";
import { ContainerInfo } from "dockerode";
import { ReactNode } from "react";

export function ContainerAreasComponent({ containers }: { containers: ContainerInfo[] }): ReactNode {
  const { mutate: startMutate } = useStartContainer();
  const { mutate: stopMutate } = useStopContainer();

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over) {
      const containerData = active.data.current as {
        containerId: string;
        containerName: string;
        currentState: string;
      };
      const targetArea = over.id;

      if (containerData.currentState === "running" && targetArea === "active-area") return;
      if (containerData.currentState === "exited" && targetArea === "inactive-area") return;

      if (targetArea === "active-area") {
        return startMutate(containerData.containerId);
      }

      if (targetArea === "inactive-area") {
        return stopMutate(containerData.containerId);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <S.ContainerAreas>
        <ActiveContainersArea containers={containers.filter(({ State }) => State === "running")} />
        <InactiveContainersArea containers={containers.filter(({ State }) => State === "exited")} />
      </S.ContainerAreas>
    </DndContext>
  );
}
