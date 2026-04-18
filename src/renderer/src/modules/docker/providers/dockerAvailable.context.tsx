import { useContext, createContext } from "react";

interface InterfaceDockerAvailableContext {
  isAvailable: boolean | null;
}

export const DockerAvailableContext = createContext<InterfaceDockerAvailableContext>({ isAvailable: null });

export function useDockerAvailable(): InterfaceDockerAvailableContext {
  const context = useContext(DockerAvailableContext);
  if (!context) throw new Error("useDockerAvailable must be used within a DockerAvailableProvider");

  return context;
}
