import { useTranslation } from "react-i18next";
import { SettingCardLanguageComponent } from "../../components/settingsCardLanguage.component";
import { SettingCardThemeComponent } from "../../components/settingCardTheme.component";
import * as SettingCard from "../../settingCard.style";
import * as S from "./settings.style";

export function SettingsPage(): React.ReactNode {
  const { t } = useTranslation("settings");

  return (
    <S.Settings>
      <S.SettingsContainer>
        <S.Title>{t("title")}</S.Title>
        <SettingCard.CardsContainer>
          <SettingCardLanguageComponent />
          <SettingCardThemeComponent />
        </SettingCard.CardsContainer>
      </S.SettingsContainer>
    </S.Settings>
  );
}
