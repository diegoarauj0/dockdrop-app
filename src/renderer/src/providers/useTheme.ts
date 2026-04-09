import { createContext, useContext } from "react";
import { ThemeType } from "../theme";

interface ThemeContextType {
  toggleTheme: () => void;
  theme: ThemeType;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
