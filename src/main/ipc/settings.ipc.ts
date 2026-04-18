import { InterfaceSettings, SettingsService } from "../services/settings.service";
import { ipcMain } from "electron";

const settingsService = new SettingsService();

export function registerSettingsIpc(): void {
  ipcMain.handle("settings:reset", async () => {
    return settingsService.reset();
  });

  ipcMain.handle("settings:get", async (_, key: keyof InterfaceSettings) => {
    return settingsService.get(key);
  });

  ipcMain.handle("settings:get_all", async () => {
    return settingsService.getAll();
  });

  ipcMain.handle("settings:set", async (_, key: keyof InterfaceSettings, value: InterfaceSettings[keyof InterfaceSettings]) => {
    return settingsService.set(key, value);
  });

  ipcMain.handle("settings:set_all", async (_, settings: InterfaceSettings) => {
    return settingsService.setAll(settings);
  });
}
