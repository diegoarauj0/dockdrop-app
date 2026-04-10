import { ThemeProvider } from "./providers/theme.provider";
import { RouterProvider } from "react-router";
import GlobalStyle from "./global.style";
import { router } from "./router";

export function App(): React.ReactNode {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
