const sharedTheme = {
  breakpoints: {
    mobile: 480,
    compact: 560,
    tablet: 768,
    laptop: 900,
    desktop: 1025,
    wide: 1100,
  },
  spacing: {
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
  },
  "font-sizes": {
    xs: "0.625rem",
    sm: "0.75rem",
    md: "0.875rem",
    lg: "1rem",
    xl: "1.5rem",
    xxl: "2.25rem",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    pill: "999px",
  },
  sizes: {
    dot: "8px",
    badge: "24px",
    iconSm: "24px",
    iconMd: "32px",
    iconLg: "48px",
    "section-min-height": "224px",
    "stat-card-min-height": "128px",
    "control-min-height": "48px",
    "sidebar-width": "300px",
    "sidebar-collapsed-width": "88px",
    "content-max-width": "480px",
  },
  "border-widths": {
    thin: "1px",
    regular: "2px",
    strong: "4px",
  },
};

export const darkTheme = {
  ...sharedTheme,
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
  ...sharedTheme,
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
