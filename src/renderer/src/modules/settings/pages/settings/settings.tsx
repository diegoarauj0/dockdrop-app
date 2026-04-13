import { SettingCardLanguageComponent } from "../../components/settingsCardLanguage";
import { SettingCardThemeComponent } from "../../components/settingCardTheme";
import * as SettingCard from "../../settingCardStyle";
import * as S from "./settings.style";

export function SettingsPage(): React.ReactNode {
  return (
    <S.Settings>
      <S.SettingsContainer>
        <S.Title>Settings</S.Title>
        <SettingCard.CardsContainer>
          <SettingCardLanguageComponent />
          <SettingCardThemeComponent />
        </SettingCard.CardsContainer>
      </S.SettingsContainer>
    </S.Settings>
  );
}
