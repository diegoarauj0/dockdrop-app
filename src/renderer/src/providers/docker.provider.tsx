import { ReactNode } from "react";
import { DockerContext } from "./useDocker";
import { Navigate } from "react-router";
import { usePing } from "../hooks/reactQuery/usePing";

export function DockerProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { data, isLoading } = usePing();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.success) {
    return <Navigate to="/docker-error" replace />;
  }

  return <DockerContext.Provider value={{ isAvailable: data.success }}>{children}</DockerContext.Provider>;
}
