import { DraggableContainerCardComponent } from "../draggableContainerCard/draggableContainerCard.component";
import { BaseContainerAreaComponent } from "../baseContainerArea/baseContainerArea.component";
import { useTheme } from "../../../theme/providers/theme.context";
import * as S from "./containerListArea.style";
import { ContainerInfo } from "dockerode";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("container");

  if (isEmpty) {
    return (
      <BaseContainerAreaComponent
        minHeight={currentTheme.sizes.container_list_area_min_height}
        borderColor={borderColor}
        id={id}
        title={title}
        rightContent={<S.Badge style={{ borderColor }}>{containers.length}</S.Badge>}
      >
        <S.Placeholder>{variant === "active" ? t("list.noActiveContainers") : t("list.noInactiveContainers")}</S.Placeholder>
      </BaseContainerAreaComponent>
    );
  }

  return (
    <BaseContainerAreaComponent
      minHeight={currentTheme.sizes.container_list_area_min_height}
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
