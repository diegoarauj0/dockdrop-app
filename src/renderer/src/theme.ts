export const darkTheme = {
  "bg-dark": "#0b0c1a",
  bg: "#121327",
  "bg-light": "#1a1b34",
  text: "#f2f4ff",
  "text-muted": "#b8bbd9",
  highlight: "#6f78c9",
  border: "#52579f",
  "border-muted": "#3c3f73",
  primary: "#3b82f6",
  secondary: "#b8c76a",
  danger: "#d16a5f",
  warning: "#c9a84f",
  success: "#4fbf8f",
  info: "#5f8fd1",
};

export const lightTheme = {
  "bg-dark": "#e7e8f5",
  bg: "#f2f3ff",
  "bg-light": "#ffffff",
  text: "#121327",
  "text-muted": "#52579f",
  highlight: "#ffffff",
  border: "#8a8fd1",
  "border-muted": "#a3a7e0",
  primary: "#3b82f6",
  secondary: "#6b7a2f",
  danger: "#a94a42",
  warning: "#9a7f2f",
  success: "#2f8a66",
  info: "#426aa9",
};

export type ThemeType = "dark" | "light";
export type Theme = typeof darkTheme;

export const STORAGE_KEY = "dockdrop-theme";
