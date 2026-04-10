import { createContext, useContext } from "react";
import { Theme, ThemeType } from "../theme";

interface ThemeContextType {
  toggleTheme: () => void;
  currentTheme: Theme;
  theme: ThemeType;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
