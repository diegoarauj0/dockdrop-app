import { DockerAvailableContext } from "./dockerAvailable.context";
import { usePingQuery } from "../queries/usePing.query";
import { Navigate } from "react-router";
import { ReactNode } from "react";

export function DockerAvailableProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { data, isLoading } = usePingQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Navigate to="/docker-error" replace />;
  }

  return <DockerAvailableContext.Provider value={{ isAvailable: true }}>{children}</DockerAvailableContext.Provider>;
}
