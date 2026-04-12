import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useSettings } from "../hooks/reactQuery/useSettings";
import { useTranslation } from "react-i18next";

export function LanguageProvider({ children }: PropsWithChildren): ReactNode {
  const { i18n } = useTranslation();
  const { data } = useSettings();

  useEffect(() => {
    i18n.changeLanguage(data.language);
  }, [data.language]);

  return children;
}
