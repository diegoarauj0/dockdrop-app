import { useTranslation } from "react-i18next";
import { useMutationSetSetting } from "../queries/useSetSetting.mutation";
import { useSettingsQuery } from "../queries/useSettings.query";
import * as SettingCard from "../settingCard.style";
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
