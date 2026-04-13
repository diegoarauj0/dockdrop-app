import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useSettingsQuery } from "../../settings/queries/useSettingsQuery";
import { darkTheme, lightTheme } from "../theme";
import { ThemeContext } from "./theme.context";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }): React.ReactNode {
  const { data } = useSettingsQuery();

  const currentTheme = data.theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: data.theme, currentTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
