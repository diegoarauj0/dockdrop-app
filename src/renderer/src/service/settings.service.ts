export interface ISettings {
  theme: "light" | "dark";
  language: string;
}

export class SettingsService {
  private load(): Promise<ISettings> {
    console.log(`[RENDERER] SettingsService.load`);
    return window.electron.ipcRenderer.invoke("settings:load");
  }

  public getAll(): Promise<ISettings> {
    console.log(`[RENDERER] SettingsService.getAll`);
    return window.electron.ipcRenderer.invoke("settings:get_all");
  }

  public get<K extends keyof ISettings>(key: K): Promise<ISettings[K]> {
    console.log(`[RENDERER] SettingsService.get`);
    return window.electron.ipcRenderer.invoke("settings:get", key);
  }

  public set<K extends keyof ISettings>(key: K, value: ISettings[K]): Promise<void> {
    console.log(`[RENDERER] SettingsService.set`);
    return window.electron.ipcRenderer.invoke("settings:set", key, value);
  }

  public setAll(newSettings: Partial<ISettings>): Promise<void> {
    console.log(`[RENDERER] SettingsService.set_all`);
    return window.electron.ipcRenderer.invoke("settings:set_all", newSettings);
  }

  public reset(): Promise<void> {
    console.log(`[RENDERER] SettingsService.reset`);
    return window.electron.ipcRenderer.invoke("settings:reset");
  }
}
