import { createContext, HTMLInputTypeAttribute, useContext } from "react";
import { LucideIcon } from "lucide-react";
import { Schema } from "joi";

export type ContainerModuleType = "name" | "port" | "env" | "image";
export type ContainerModuleFieldValue = string | number | boolean;

export interface InterfaceField {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  configKey: string;
  schema: Schema;
  label: string;
}

export interface InterfaceContainerModuleAbout {
  type: ContainerModuleType;
  fields: InterfaceField[];
  icon: LucideIcon;
  label: string;
  unique: boolean;
  required: boolean;
}

export interface InterfaceAvailableContainerModule {
  about: InterfaceContainerModuleAbout;
  type: ContainerModuleType;
  id: string;
}

export interface InterfaceSelectedContainerModule {
  config: Record<string, { value: ContainerModuleFieldValue; error?: string }>;
  about: InterfaceContainerModuleAbout;
  type: ContainerModuleType;
  id: string;
}

export interface InterfaceContainerModules {
  availableContainerModules: InterfaceAvailableContainerModule[];
  selectedContainerModules: InterfaceSelectedContainerModule[];

  remove: (id: InterfaceSelectedContainerModule["id"]) => void;
  add: (type: ContainerModuleType) => void;
  setConfigValue: (
    moduleId: InterfaceSelectedContainerModule["id"],
    configKey: InterfaceField["configKey"],
    value: ContainerModuleFieldValue,
  ) => void;
  setConfigError: (
    moduleId: InterfaceSelectedContainerModule["id"],
    configKey: InterfaceField["configKey"],
    error?: string,
  ) => void;
  clear: () => void;
}

export const ContainerModulesContext = createContext<InterfaceContainerModules | undefined>(undefined);

export function useContainerModules(): InterfaceContainerModules {
  const context = useContext(ContainerModulesContext);
  if (!context) throw new Error("useContainerModules must be used within a ContainerModulesProvider");

  return context;
}
