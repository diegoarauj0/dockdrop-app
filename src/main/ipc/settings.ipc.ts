import { ISettings, SettingsService } from "../service/settings.service";
import { ipcMain } from "electron";

const settingsService = new SettingsService();

export function registerSettingsIpc(): void {
  ipcMain.handle("settings:reset", async () => {
    return settingsService.reset();
  });

  ipcMain.handle("settings:get", async (_, key: keyof ISettings) => {
    return settingsService.get(key);
  });

  ipcMain.handle("settings:get_all", async () => {
    return settingsService.getAll();
  });

  ipcMain.handle("settings:set", async (_, key: keyof ISettings, value: ISettings[keyof ISettings]) => {
    return settingsService.set(key, value);
  });

  ipcMain.handle("settings:set_all", async (_, settings: ISettings) => {
    return settingsService.setAll(settings);
  });
}
