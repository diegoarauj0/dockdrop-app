import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsQuery } from "../settings/queries/useSettingsQuery";

export function LanguageProvider({ children }: PropsWithChildren): ReactNode {
  const { data } = useSettingsQuery();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(data.language);
  }, [data.language]);

  return children;
}
