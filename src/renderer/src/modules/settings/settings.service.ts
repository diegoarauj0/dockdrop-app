export interface InterfaceSettings {
  theme: "light" | "dark";
  language: string;
}

class SettingsService {
  public getAll(): Promise<InterfaceSettings> {
    console.log(`[RENDERER] SettingsService.getAll`);
    return window.electron.ipcRenderer.invoke("settings:get_all");
  }

  public get<K extends keyof InterfaceSettings>(key: K): Promise<InterfaceSettings[K]> {
    console.log(`[RENDERER] SettingsService.get`);
    return window.electron.ipcRenderer.invoke("settings:get", key);
  }

  public set<K extends keyof InterfaceSettings>(key: K, value: InterfaceSettings[K]): Promise<void> {
    console.log(`[RENDERER] SettingsService.set`);
    return window.electron.ipcRenderer.invoke("settings:set", key, value);
  }

  public setAll(newSettings: Partial<InterfaceSettings>): Promise<void> {
    console.log(`[RENDERER] SettingsService.set_all`);
    return window.electron.ipcRenderer.invoke("settings:set_all", newSettings);
  }

  public reset(): Promise<void> {
    console.log(`[RENDERER] SettingsService.reset`);
    return window.electron.ipcRenderer.invoke("settings:reset");
  }
}

export const settingsService = new SettingsService();
