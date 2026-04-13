import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./modules/language/i18n";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
