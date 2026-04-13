import { useTranslation } from "react-i18next";
import { useMutationSetSetting } from "../queries/useMutationSetSetting";
import { useSettingsQuery } from "../queries/useSettingsQuery";
import * as SettingCard from "../settingCardStyle";
import { Moon, Sun } from "lucide-react";
import { ReactNode } from "react";

export function SettingCardThemeComponent(): ReactNode {
  const { t } = useTranslation("settings");
  const { mutate } = useMutationSetSetting();
  const { data } = useSettingsQuery();

  const { theme } = data;

  return (
    <SettingCard.Card>
      <SettingCard.CardLabel>{t("theme.title")}</SettingCard.CardLabel>
      <SettingCard.ButtonGroup>
        <SettingCard.Button
          $isActive={theme === "light"}
          onClick={() => {
            if (theme !== "light") mutate({ key: "theme", value: "light" });
          }}
        >
          <Sun /> {t("theme.light")}
        </SettingCard.Button>
        <SettingCard.Button
          $isActive={theme === "dark"}
          onClick={() => {
            if (theme !== "dark") mutate({ key: "theme", value: "dark" });
          }}
        >
          <Moon /> {t("theme.dark")}
        </SettingCard.Button>
      </SettingCard.ButtonGroup>
    </SettingCard.Card>
  );
}
