import { usePingQuery } from "../../../docker/queries/usePing.query";
import { useTranslation } from "react-i18next";
import * as S from "./dockerError.style";
import { Navigate } from "react-router";

export function DockerErrorPage(): React.ReactNode {
  const { t } = useTranslation("home");
  const { isError } = usePingQuery();

  if (!isError) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <S.ErrorContainer>
      <S.ErrorTitle>{t("home_docker_error.title")}</S.ErrorTitle>
      <S.ErrorMessage>{t("home_docker_error.message")}</S.ErrorMessage>
    </S.ErrorContainer>
  );
}
