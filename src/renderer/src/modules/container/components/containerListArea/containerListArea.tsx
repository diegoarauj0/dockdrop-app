import { DraggableContainerCardComponent } from "../draggableContainerCard/draggableContainerCard";
import { useTheme } from "../../../theme/theme.context";
import * as S from "./containerListArea.style";
import { ContainerInfo } from "dockerode";
import { BaseContainerAreaComponent } from "../baseContainerArea/baseContainerArea";

interface InterfaceContainerListAreaProps {
  variant: "active" | "inactive";
  containers: ContainerInfo[];
  borderColor?: string;
  title: string;
  id: string;
}

export function ContainerListAreaComponent(props: InterfaceContainerListAreaProps): React.ReactNode {
  const { id, title, variant, containers, borderColor } = props;

  const isEmpty = containers.length === 0;
  const { currentTheme } = useTheme();

  if (isEmpty) {
    return (
      <BaseContainerAreaComponent
        minHeight={currentTheme.sizes["container-list-area-min-height"]}
        borderColor={borderColor}
        id={id}
        title={title}
        rightContent={<S.Badge style={{ borderColor }}>{containers.length}</S.Badge>}
      >
        <S.Placeholder>{variant === "active" ? "No active containers" : "No inactive containers"}</S.Placeholder>
      </BaseContainerAreaComponent>
    );
  }

  return (
    <BaseContainerAreaComponent
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
    </BaseContainerAreaComponent>
  );
}
