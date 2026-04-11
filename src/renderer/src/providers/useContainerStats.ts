import { createContext, useContext } from "react";
import { ContainerStats } from "dockerode";

interface IContainerStatsContextType {
  containerStats: ContainerStats[];
}

export const ContainerStatsContext = createContext<IContainerStatsContextType | undefined>(undefined);

export function useContainerStats(): IContainerStatsContextType {
  const context = useContext(ContainerStatsContext);
  if (!context) throw new Error("useContainerStats must be used within a ContainerStatsProvider");

  return context;
}
