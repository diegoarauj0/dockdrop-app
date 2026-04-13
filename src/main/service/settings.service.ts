import { app } from "electron";
import path from "path";
import fs from "fs";

export interface ISettings {
  theme: "light" | "dark";
  language: string;
}

export class SettingsService {
  private settings: ISettings = this.load();

  public static readonly SETTINGS_FILE_PATH = path.join(app.getPath("userData"), "settings.json");
  public static readonly DEFAULT_SETTINGS: ISettings = {
    language: "en",
    theme: "dark",
  };

  private load(): ISettings {
    console.log(`[MAIN] SettingsService.load`);
    try {
      if (!fs.existsSync(SettingsService.SETTINGS_FILE_PATH)) {
        this.save(SettingsService.DEFAULT_SETTINGS);
        return SettingsService.DEFAULT_SETTINGS;
      }

      const file = fs.readFileSync(SettingsService.SETTINGS_FILE_PATH, "utf-8");
      return { ...SettingsService.DEFAULT_SETTINGS, ...JSON.parse(file) };
    } catch (err) {
      console.error("Erro load settings:", err);
      return SettingsService.DEFAULT_SETTINGS;
    }
  }

  private save(settings: ISettings): void {
    console.log(`[MAIN] SettingsService.save`);
    try {
      fs.writeFileSync(SettingsService.SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2), "utf-8");
    } catch (err) {
      console.error("Erro load settings:", err);
    }
  }

  public getAll(): ISettings {
    console.log(`[MAIN] SettingsService.getAll`);
    return this.settings;
  }

  public get<K extends keyof ISettings>(key: K): ISettings[K] {
    console.log(`[MAIN] SettingsService.get`);
    return this.settings[key];
  }

  public set<K extends keyof ISettings>(key: K, value: ISettings[K]): void {
    console.log(`[MAIN] SettingsService.set`);
    this.settings[key] = value;
    this.save(this.settings);
  }

  public setAll(newSettings: Partial<ISettings>): void {
    console.log(`[MAIN] SettingsService.setAll`);
    this.settings = { ...this.settings, ...newSettings };
    this.save(this.settings);
  }

  public reset(): void {
    console.log(`[MAIN] SettingsService.reset`);
    this.settings = SettingsService.DEFAULT_SETTINGS;
    this.save(this.settings);
  }
}
