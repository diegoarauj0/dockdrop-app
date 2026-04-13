import { createContext, useContext } from "react";
import { Theme, ThemeType } from "./theme";

interface InterfaceThemeContextType {
  currentTheme: Theme;
  theme: ThemeType;
}

export const ThemeContext = createContext<InterfaceThemeContextType | undefined>(undefined);

export function useTheme(): InterfaceThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
