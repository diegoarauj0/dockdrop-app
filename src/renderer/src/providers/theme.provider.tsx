import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme, ThemeType, STORAGE_KEY } from "../theme";
import { useState, useEffect, ReactNode } from "react";
import { ThemeContext } from "./useTheme";

export function ThemeProvider({ children }: { children: ReactNode }): React.ReactNode {
  const stored = localStorage.getItem(STORAGE_KEY);

  const [theme, setTheme] = useState<ThemeType>(stored === "light" ? "light" : "dark");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
