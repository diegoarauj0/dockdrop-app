import * as S from "./dockerError.style";
import { useTranslation } from "react-i18next";

export function DockerErrorPage(): React.ReactNode {
  const { t } = useTranslation("home");

  return (
    <S.ErrorContainer>
      <S.ErrorTitle>{t("home_docker_error.title")}</S.ErrorTitle>
      <S.ErrorMessage>{t("home_docker_error.message")}</S.ErrorMessage>
    </S.ErrorContainer>
  );
}
