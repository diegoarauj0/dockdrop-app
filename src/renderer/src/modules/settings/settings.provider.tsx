import { settingsService } from "./settings.service";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

export function SettingsProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { isPending } = useQuery({ queryKey: ["settings"], queryFn: settingsService.getAll });

  if (isPending) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}
