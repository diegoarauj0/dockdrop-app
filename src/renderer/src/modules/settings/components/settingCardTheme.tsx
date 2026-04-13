import { useMutationSetSetting } from "../queries/useMutationSetSetting";
import { useSettingsQuery } from "../queries/useSettingsQuery";
import * as SettingCard from "../settingCardStyle";
import { Moon, Sun } from "lucide-react";
import { ReactNode } from "react";

export function SettingCardThemeComponent(): ReactNode {
  const { mutate } = useMutationSetSetting();
  const { data } = useSettingsQuery();

  const { theme } = data;

  return (
    <SettingCard.Card>
      <SettingCard.CardLabel>THEME</SettingCard.CardLabel>
      <SettingCard.ButtonGroup>
        <SettingCard.Button
          $isActive={theme === "light"}
          onClick={() => {
            if (theme !== "light") mutate({ key: "theme", value: "light" });
          }}
        >
          <Sun /> Light
        </SettingCard.Button>
        <SettingCard.Button
          $isActive={theme === "dark"}
          onClick={() => {
            if (theme !== "dark") mutate({ key: "theme", value: "dark" });
          }}
        >
          <Moon /> Dark
        </SettingCard.Button>
      </SettingCard.ButtonGroup>
    </SettingCard.Card>
  );
}
