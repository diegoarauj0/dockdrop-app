import { InterfaceSettings, settingsService } from "../settings.service";
import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";

export function useSettingsQuery(): DefinedUseQueryResult<InterfaceSettings> {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsService.getAll(),
    initialData: { language: "pt", theme: "dark" } as InterfaceSettings,
  });
}
