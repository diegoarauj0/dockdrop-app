import { useContext, createContext } from "react";

interface DockerContextType {
  isAvailable: boolean | null;
}

export const DockerContext = createContext<DockerContextType>({ isAvailable: null });

export function useDocker(): DockerContextType {
  const context = useContext(DockerContext);
  if (!context) throw new Error("useDocker must be used within a DockerProvider");

  return context;
}
