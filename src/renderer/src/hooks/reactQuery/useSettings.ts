import { ISettings, SettingsService } from "../../service/settings.service";
import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";

export function useSettings(): DefinedUseQueryResult<ISettings> {
  const settingsService = new SettingsService();

  return useQuery({
    queryKey: ["settings"],
    queryFn: settingsService.getAll,
    initialData: { language: "pt", theme: "dark" } as ISettings,
  });
}
