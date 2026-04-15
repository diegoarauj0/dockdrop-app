import { is } from "@electron-toolkit/utils";
import { app } from "electron";
import path from "path";
import fs from "fs";

export interface InterfaceSettings {
  theme: "light" | "dark";
  language: string;
}
export class SettingsService {
  private settings: InterfaceSettings | null = null;
  private loading?: Promise<void>;
  private readonly isDev = is.dev;

  public static readonly SETTINGS_FILE_PATH = path.join(app.getPath("userData"), "settings.json");

  public static readonly DEFAULT_SETTINGS: InterfaceSettings = {
    language: "en",
    theme: "dark",
  };

  private async ensureLoaded(): Promise<void> {
    if (this.settings) return;

    if (!this.loading) {
      this.loading = this.loadSettings();
    }

    await this.loading;
  }

  private async loadSettings(): Promise<void> {
    this.logger("load:start");

    try {
      if (!fs.existsSync(SettingsService.SETTINGS_FILE_PATH)) {
        this.logger("load:file_not_found => creating default");
        await this.save(SettingsService.DEFAULT_SETTINGS);
        return;
      }

      const file = await fs.promises.readFile(SettingsService.SETTINGS_FILE_PATH, "utf-8");

      const parsed = JSON.parse(file);

      this.settings = {
        ...SettingsService.DEFAULT_SETTINGS,
        ...parsed,
      };

      this.logger("load:success", this.settings);
    } catch (error) {
      this.logger("load:error => resetting", error);
      await this.save(SettingsService.DEFAULT_SETTINGS);
    }
  }

  private async save(settings: InterfaceSettings): Promise<void> {
    this.logger("save:start", settings);

    await fs.promises.writeFile(SettingsService.SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2), "utf-8");

    this.settings = settings;

    this.logger("save:done");
  }

  private async clear(): Promise<void> {
    this.logger("clear");

    await fs.promises.writeFile(SettingsService.SETTINGS_FILE_PATH, "{}", "utf-8");

    this.settings = null;
    this.loading = undefined;
  }

  public async getAll(): Promise<InterfaceSettings> {
    this.logger("getAll");

    await this.ensureLoaded();

    return this.settings!;
  }

  public async get<K extends keyof InterfaceSettings>(key: K): Promise<InterfaceSettings[K]> {
    this.logger("get", key);

    await this.ensureLoaded();

    return this.settings![key];
  }

  public async set<K extends keyof InterfaceSettings>(key: K, value: InterfaceSettings[K]): Promise<void> {
    this.logger("set", { key, value });

    await this.ensureLoaded();

    await this.save({
      ...this.settings!,
      [key]: value,
    });
  }

  public async setAll(newSettings: Partial<InterfaceSettings>): Promise<void> {
    this.logger("setAll", newSettings);

    await this.ensureLoaded();

    await this.save({
      ...this.settings!,
      ...newSettings,
    });
  }

  public async reset(): Promise<void> {
    this.logger("reset");
    await this.clear();
  }

  private logger(event: string, data?: unknown): void {
    if (!this.isDev) return;

    console.log(`[${new Date().toISOString()}] [SettingsService] ${event}`, data ?? "");
  }
}
