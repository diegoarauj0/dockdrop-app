import * as ContainerModulesContext from "../../providers/containerModules/containerModules.context";
import { GripVertical, X } from "lucide-react";
import * as S from "./containerModule.style";
import { useDraggable } from "@dnd-kit/core";
import { ChangeEvent } from "react";

interface InterfaceContainerModuleProps {
  about: ContainerModulesContext.InterfaceContainerModuleAbout;
  variant: "available" | "selected";
  id: string;
}

export function ContainerModuleComponent(props: InterfaceContainerModuleProps): React.ReactNode {
  const { about, id, variant } = props;
  const { icon: Icon, label, fields, type, unique } = about;

  const { remove, setConfigError, setConfigValue, selectedContainerModules } = ContainerModulesContext.useContainerModules();

  const disabled = selectedContainerModules.find((selectedModule) => selectedModule.type === type && unique) !== undefined;

  const { setNodeRef, listeners, transform, attributes, isDragging } = useDraggable({
    id,
    disabled,
    data: { about, id },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : "auto",
      }
    : undefined;

  if (variant === "available") {
    return (
      <S.ContainerModuleCard $variant={variant} style={style} ref={setNodeRef} $disabled={disabled}>
        <S.Header>
          <S.TitleGroup>
            <S.DragHandle {...attributes} {...listeners}>
              <GripVertical size={16} strokeWidth={2.25} />
            </S.DragHandle>

            <S.ModuleLeadingArea $variant={variant}>
              <Icon size={18} strokeWidth={2.25} />
            </S.ModuleLeadingArea>

            <S.ModuleTitle>{label}</S.ModuleTitle>
          </S.TitleGroup>
        </S.Header>
      </S.ContainerModuleCard>
    );
  }

  const { config } = selectedContainerModules.find(
    (selectedContainerModule) => selectedContainerModule.id === id,
  ) as ContainerModulesContext.InterfaceSelectedContainerModule;

  const handleFieldChange = (configKey: string, schema: ContainerModulesContext.InterfaceField["schema"]) => {
    return (event: ChangeEvent<HTMLInputElement>): void => {
      const { error, value } = schema.validate(event.target.value);

      setConfigError(id, configKey, error?.message);

      setConfigValue(id, configKey, value);
    };
  };

  return (
    <S.ContainerModuleCard $variant={variant}>
      <S.Header>
        <S.TitleGroup>
          <S.ModuleLeadingArea $variant={variant}>
            <Icon size={18} strokeWidth={2.25} />
          </S.ModuleLeadingArea>
          <S.ModuleTitle>{label}</S.ModuleTitle>
        </S.TitleGroup>

        <S.CloseButton type="button" onClick={() => remove(id)}>
          <X size={18} strokeWidth={2.25} />
        </S.CloseButton>
      </S.Header>

      <S.FieldGrid $columns={fields.length > 1 ? 2 : 1}>
        {fields.map(({ configKey, label: fieldLabel, placeholder, type, schema }) => (
          <S.FieldGroup key={configKey}>
            <S.FieldLabel>{fieldLabel}</S.FieldLabel>
            <S.FieldInput
              placeholder={placeholder}
              type={type}
              onChange={handleFieldChange(configKey, schema)}
              $hasError={config[configKey]?.error !== undefined}
            />
            {config[configKey]?.error ? <S.FieldError>{config[configKey].error}</S.FieldError> : null}
          </S.FieldGroup>
        ))}
      </S.FieldGrid>
    </S.ContainerModuleCard>
  );
}
