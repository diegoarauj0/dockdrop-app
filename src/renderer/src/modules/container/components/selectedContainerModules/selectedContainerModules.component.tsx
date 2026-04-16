import { useDroppable } from "@dnd-kit/core";
import { useContainerModules } from "../../providers/containerModules/containerModules.context";
import { ContainerModuleComponent } from "../containerModule/containerModule.component";
import * as S from "./selectedContainerModules.style";

interface InterfaceSelectedContainerModulesProps {
  badge: string;
}

export function SelectedContainerModulesComponent({ badge }: InterfaceSelectedContainerModulesProps): React.ReactNode {
  const { selectedContainerModules } = useContainerModules();
  const { setNodeRef, isOver } = useDroppable({ id: "selected-container-modules" });

  return (
    <S.BlueprintPanel ref={setNodeRef}>
      <S.BlueprintFrame $active={isOver}>
        <S.BlueprintBadge>{badge}</S.BlueprintBadge>

        <S.BlueprintCards>
          {selectedContainerModules.map(({ id, about }) => (
            <ContainerModuleComponent key={id} about={about} id={id} variant="selected" />
          ))}
        </S.BlueprintCards>
      </S.BlueprintFrame>
    </S.BlueprintPanel>
  );
}
