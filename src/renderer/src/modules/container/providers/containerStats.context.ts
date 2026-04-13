import { createContext, useContext } from "react";
import { ContainerStats } from "dockerode";

interface InterfaceContainerStatsContextType {
  containerStats: ContainerStats[];
}

export const ContainerStatsContext = createContext<InterfaceContainerStatsContextType | undefined>(undefined);

export function useContainerStats(): InterfaceContainerStatsContextType {
  const context = useContext(ContainerStatsContext);
  if (!context) throw new Error("useContainerStats must be used within a ContainerStatsProvider");

  return context;
}
