import * as S from "./inactiveContainersArea.style";
import { useDroppable } from "@dnd-kit/core";
import { ContainerInfo } from "dockerode";
import { DraggableContainerCardComponent } from "../draggableContainerCard/draggableContainerCard";

interface InactiveContainersAreaProps {
  containers: ContainerInfo[];
}

export function InactiveContainersArea({ containers }: InactiveContainersAreaProps): React.ReactNode {
  const { setNodeRef, isOver } = useDroppable({
    id: "inactive-area",
  });

  return (
    <S.Section $active={isOver} ref={setNodeRef}>
      <S.Header>
        <S.Title>Inactive Containers</S.Title>
        <S.Count>{containers.length}</S.Count>
      </S.Header>

      <S.Cards>
        {containers.map((container) => (
          <DraggableContainerCardComponent {...container} draggableId={`draggable-${container.Id}`} key={container.Id} />
        ))}
      </S.Cards>
    </S.Section>
  );
}
