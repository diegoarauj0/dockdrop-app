import { availableContainerModules } from "./availableContainerModules";
import * as ContainerModulesContext from "./containerModules.context";
import React, { PropsWithChildren, useState } from "react";

export function ContainerModulesProvider({ children }: PropsWithChildren): React.ReactNode {
  const [selectedContainerModules, setSelectedContainerModules] = useState<
    ContainerModulesContext.InterfaceSelectedContainerModule[]
  >([]);

  const add = (targetType: ContainerModulesContext.ContainerModuleType): void => {
    setSelectedContainerModules((selectedContainerModules) => {
      const about = availableContainerModules.find(({ type }) => type === targetType)?.about;

      if (about === undefined) throw new Error("type not found.");

      return [...selectedContainerModules, { type: targetType, id: Math.random().toString(36).substring(2), about, config: {} }];
    });
  };

  const remove = (targetId: ContainerModulesContext.InterfaceSelectedContainerModule["id"]): void => {
    setSelectedContainerModules((selectedContainerModules) => {
      return selectedContainerModules.filter(({ id }) => id !== targetId);
    });
  };

  const clear = (): void => {
    setSelectedContainerModules([]);
  };

  const setConfigError = (
    moduleId: ContainerModulesContext.InterfaceSelectedContainerModule["id"],
    configKey: ContainerModulesContext.InterfaceField["configKey"],
    error?: string,
  ): void => {
    setSelectedContainerModules((selectedContainerModules) =>
      selectedContainerModules.map((containerModule) => {
        if (containerModule.id !== moduleId) return containerModule;

        return {
          ...containerModule,
          config: {
            ...containerModule.config,
            [configKey]: { value: containerModule.config[configKey]?.value, error: error },
          },
        };
      }),
    );
  };

  const setConfigValue = (
    moduleId: ContainerModulesContext.InterfaceSelectedContainerModule["id"],
    configKey: ContainerModulesContext.InterfaceField["configKey"],
    value: ContainerModulesContext.ContainerModuleFieldValue,
  ): void => {
    setSelectedContainerModules((selectedContainerModules) =>
      selectedContainerModules.map((containerModule) => {
        if (containerModule.id !== moduleId) return containerModule;

        return {
          ...containerModule,
          config: {
            ...containerModule.config,
            [configKey]: { value: value, error: containerModule.config[configKey]?.error },
          },
        };
      }),
    );
  };

  return (
    <ContainerModulesContext.ContainerModulesContext.Provider
      value={{ clear, remove, add, setConfigValue, setConfigError, selectedContainerModules, availableContainerModules }}
    >
      {children}
    </ContainerModulesContext.ContainerModulesContext.Provider>
  );
}
