import { createContext, useContext } from "react";
import { Theme, ThemeType } from "../theme";

interface InterfaceThemeContext {
  currentTheme: Theme;
  theme: ThemeType;
}

export const ThemeContext = createContext<InterfaceThemeContext | undefined>(undefined);

export function useTheme(): InterfaceThemeContext {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
