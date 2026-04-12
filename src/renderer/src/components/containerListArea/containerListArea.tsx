import { DraggableContainerCardComponent } from "../draggableContainerCard/draggableContainerCard";
import { BaseContainerArea } from "../baseContainerArea/baseContainerArea";
import { useTheme } from "../../providers/useTheme";
import * as S from "./containerListArea.style";
import { ContainerInfo } from "dockerode";

interface IContainerListAreaProps {
  variant: "active" | "inactive";
  containers: ContainerInfo[];
  borderColor?: string;
  title: string;
  id: string;
}

export function ContainerListArea({ id, title, variant, containers, borderColor }: IContainerListAreaProps): React.ReactNode {
  const isEmpty = containers.length === 0;
  const { currentTheme } = useTheme();

  if (isEmpty) {
    return (
      <BaseContainerArea
        minHeight={currentTheme.sizes["container-list-area-min-height"]}
        borderColor={borderColor}
        id={id}
        title={title}
        rightContent={<S.Badge style={{ borderColor }}>{containers.length}</S.Badge>}
      >
        <S.Placeholder>{variant === "active" ? "No active containers" : "No inactive containers"}</S.Placeholder>
      </BaseContainerArea>
    );
  }

  return (
    <BaseContainerArea
      minHeight={currentTheme.sizes["container-list-area-min-height"]}
      id={id}
      title={title}
      borderColor={borderColor}
      rightContent={<S.Badge style={{ borderColor }}>{containers.length}</S.Badge>}
    >
      <S.Cards>
        {containers.map((container) => (
          <DraggableContainerCardComponent key={container.Id} draggableId={`draggable-${container.Id}`} {...container} />
        ))}
      </S.Cards>
    </BaseContainerArea>
  );
}
