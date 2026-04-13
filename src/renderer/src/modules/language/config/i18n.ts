import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  supportedLngs: ["en", "pt"],
  fallbackLng: "en",
  ns: ["settings", "container", "home", "shared"],
  resources,
  lng: "en",
});

export default i18n;
