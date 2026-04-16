import { usePingQuery } from "../queries/usePing.query";
import { DockerContext } from "./docker.context";
import { Navigate } from "react-router";
import { ReactNode } from "react";

export function DockerProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { data, isLoading } = usePingQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Navigate to="/docker-error" replace />;
  }

  return <DockerContext.Provider value={{ isAvailable: data }}>{children}</DockerContext.Provider>;
}
