import ptSettings from "../locales/pt/settings.json";
import enSettings from "../locales/en/settings.json";
import ptContainer from "../locales/pt/container.json";
import enContainer from "../locales/en/container.json";
import ptHome from "../locales/pt/home.json";
import enHome from "../locales/en/home.json";
import ptShared from "../locales/pt/shared.json";
import enShared from "../locales/en/shared.json";

export const resources = {
  en: { ...enSettings, ...enContainer, ...enHome, ...enShared },
  pt: { ...ptSettings, ...ptContainer, ...ptHome, ...ptShared },
};
