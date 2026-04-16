import { useContainerModules } from "../../providers/containerModules/containerModules.context";
import { ContainerModuleComponent } from "../containerModule/containerModule.component";
import * as S from "./availableContainerModules.style";

interface InterfaceAvailableContainerModulesProps {
  description: string;
  title: string;
}

export function AvailableContainerModulesComponent({
  description,
  title,
}: InterfaceAvailableContainerModulesProps): React.ReactNode {
  const { availableContainerModules } = useContainerModules();

  return (
    <S.AvailableModulesPanel>
      <S.SectionEyebrow>{title}</S.SectionEyebrow>
      <S.SectionDescription>{description}</S.SectionDescription>

      <S.ModuleList>
        {availableContainerModules.map(({ about, id }) => (
          <ContainerModuleComponent key={id} id={id} about={about} variant="available" />
        ))}
      </S.ModuleList>
    </S.AvailableModulesPanel>
  );
}
