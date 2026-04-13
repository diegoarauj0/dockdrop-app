import { ContainerCardComponent } from "../containerCard/containerCard";
import { useDraggable } from "@dnd-kit/core";
import { ContainerInfo } from "dockerode";

interface InterfaceDraggableContainerCardProps extends ContainerInfo {
  draggableId: string;
}

export function DraggableContainerCardComponent(props: InterfaceDraggableContainerCardProps): React.ReactNode {
  const { draggableId, Id, Names, State } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: draggableId,
    data: { containerId: Id, containerName: Names[0].replace("/", ""), currentState: State },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : "auto",
      }
    : undefined;

  return <ContainerCardComponent {...props} style={style} ref={setNodeRef} attributes={{ ...attributes, ...listeners }} />;
}
