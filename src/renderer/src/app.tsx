import { ThemeProvider } from "./providers/ThemeProvider";
import { RouterProvider } from "react-router";
import GlobalStyle from "./globalStyle";
import { router } from "./router";

export function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
