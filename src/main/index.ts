import { registerDockerStatsIpc } from "./ipc/dockerStatsManager.ipc";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { registerDockerodeIpc } from "./ipc/docker.ipc";
import { app, shell, BrowserWindow } from "electron";
import icon from "../../resources/icon.png?asset";
import { join } from "path";

const MAIN_WINDOW_CONFIG = {
  width: 900,
  height: 670,
  show: false,
  autoHideMenuBar: true,
  webPreferences: {
    preload: join(__dirname, "../preload/index.js"),
    sandbox: false,
  },
};

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    ...MAIN_WINDOW_CONFIG,
    ...(process.platform === "linux" ? { icon } : {}),
  });

  mainWindow.on("ready-to-show", () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  return mainWindow;
}

function registerIpcHandlers(win: BrowserWindow): void {
  registerDockerodeIpc();
  registerDockerStatsIpc(win);
}

function setupApp(): void {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
}

app.whenReady().then(() => {
  setupApp();
  const browserWindow = createWindow();
  registerIpcHandlers(browserWindow);
});

app.on("window-all-closed", () => {
  app.quit();
});
