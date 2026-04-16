import { LanguageProvider } from "./modules/language/providers/language.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./modules/theme/providers/theme.provider";
import { SettingsProvider } from "./modules/settings/settings.provider";
import GlobalStyle from "./modules/theme/global.style";
import { RouterProvider } from "react-router";
import { router } from "./router";

const queryClient = new QueryClient();

function App(): React.ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SettingsProvider>
          <LanguageProvider>
            <GlobalStyle />
            <RouterProvider router={router} />
          </LanguageProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export { App };
