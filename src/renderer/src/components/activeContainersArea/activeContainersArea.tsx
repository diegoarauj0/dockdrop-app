import { useDroppable } from "@dnd-kit/core";
import * as S from "./activeContainersArea.style";
import { ContainerInfo } from "dockerode";
import { DraggableContainerCardComponent } from "../draggableContainerCard/draggableContainerCard";

interface ActiveContainersAreaProps {
  containers: ContainerInfo[];
}

export function ActiveContainersArea({ containers }: ActiveContainersAreaProps): React.ReactNode {
  const { setNodeRef, isOver } = useDroppable({
    id: "active-area",
  });

  return (
    <S.Section $active={isOver} ref={setNodeRef}>
      <S.Header>
        <S.Title>Active Containers</S.Title>
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
