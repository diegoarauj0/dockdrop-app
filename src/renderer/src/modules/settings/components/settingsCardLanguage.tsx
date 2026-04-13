import { useTranslation } from "react-i18next";
import { useMutationSetSetting } from "../queries/useMutationSetSetting";
import { useSettingsQuery } from "../queries/useSettingsQuery";
import * as SettingCard from "../settingCardStyle";
import { Languages } from "lucide-react";
import { ReactNode } from "react";

export function SettingCardLanguageComponent(): ReactNode {
  const { t } = useTranslation("settings");

  const { mutate } = useMutationSetSetting();
  const { data } = useSettingsQuery();

  const { language } = data;

  return (
    <SettingCard.Card>
      <SettingCard.CardLabel>{t("language.title")}</SettingCard.CardLabel>
      <SettingCard.SelectWrapper>
        <SettingCard.SelectIconContainer>
          <Languages />
        </SettingCard.SelectIconContainer>
        <SettingCard.Select defaultValue={language} onChange={(e) => mutate({ key: "language", value: e.target.value })}>
          <option value="pt">{t("language.pt")}</option>
          <option value="en">{t("language.en")}</option>
        </SettingCard.Select>
        <SettingCard.SelectArrow />
      </SettingCard.SelectWrapper>
    </SettingCard.Card>
  );
}
