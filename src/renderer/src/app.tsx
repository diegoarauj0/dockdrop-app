import { ThemeProvider } from "./providers/theme.provider";
import GlobalStyle from "./global.style";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContainerStatsProvider } from "./providers/containerStats.provider";

const queryClient = new QueryClient();

function App(): React.ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <ContainerStatsProvider>
        <ThemeProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ContainerStatsProvider>
    </QueryClientProvider>
  );
}

export { App };
