import { SettingsService } from "../service/settings.service";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

export function SettingsProvider({ children }: { children: ReactNode }): React.ReactNode {
  const settingsService = new SettingsService();

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
