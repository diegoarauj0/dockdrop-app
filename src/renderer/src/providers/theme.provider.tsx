import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useSettings } from "../hooks/reactQuery/useSettings";
import { darkTheme, lightTheme } from "../theme";
import { ThemeContext } from "./useTheme";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { data } = useSettings();

  const currentTheme = data.theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: data.theme, currentTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
