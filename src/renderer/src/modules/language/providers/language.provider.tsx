import { useSettingsQuery } from "../../settings/queries/useSettingsQuery";
import { PropsWithChildren, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export function LanguageProvider({ children }: PropsWithChildren): ReactNode {
  const { data } = useSettingsQuery();
  const { i18n } = useTranslation();

  if (i18n.language !== data.language) {
    i18n.changeLanguage(data.language);
  }

  return children;
}
