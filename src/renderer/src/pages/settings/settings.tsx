import { useSetSetting } from "../../hooks/reactQuery/useSetSetting";
import { useSettings } from "../../hooks/reactQuery/useSettings";
import { Languages, Moon, Sun } from "lucide-react";
import * as S from "./settings.style";

export function SettingsPage(): React.ReactNode {
  const { mutate } = useSetSetting();
  const { data } = useSettings();

  const { language, theme } = data;

  return (
    <S.Settings>
      <S.SettingsContainer>
        <S.Title>Settings</S.Title>
        <S.CardsContainer>
          <S.Card>
            <S.CardLabel>LANGUAGE</S.CardLabel>
            <S.SelectWrapper>
              <S.GlobeIcon>
                <Languages />
              </S.GlobeIcon>
              <S.Select defaultValue={language} onChange={(e) => mutate({ key: "language", value: e.target.value })}>
                <option value="pt">Português</option>
                <option value="en">English</option>
              </S.Select>
              <S.SelectArrow />
            </S.SelectWrapper>
          </S.Card>
          <S.Card>
            <S.CardLabel>THEME</S.CardLabel>
            <S.ButtonGroup>
              <S.ThemeButton
                $isActive={theme === "light"}
                onClick={() => {
                  if (theme !== "light") mutate({ key: "theme", value: "light" });
                }}
              >
                <Sun /> Light
              </S.ThemeButton>
              <S.ThemeButton
                $isActive={theme === "dark"}
                onClick={() => {
                  if (theme !== "dark") mutate({ key: "theme", value: "dark" });
                }}
              >
                <Moon /> Dark
              </S.ThemeButton>
            </S.ButtonGroup>
          </S.Card>
        </S.CardsContainer>
      </S.SettingsContainer>
    </S.Settings>
  );
}
