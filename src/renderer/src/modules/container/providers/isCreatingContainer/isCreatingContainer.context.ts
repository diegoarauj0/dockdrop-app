import { useContext, createContext } from "react";

interface InterfaceIsCreatingContainer {
  isCreatingContainer: boolean;
  set: (value: boolean) => void;
}

export const IsCreatingContainerContext = createContext<InterfaceIsCreatingContainer | undefined>(undefined);

export function useIsCreatingContainer(): InterfaceIsCreatingContainer {
  const context = useContext(IsCreatingContainerContext);
  if (!context) throw new Error("useIsCreatingContainer must be used within a IsCreatingContainerProvider");

  return context;
}
