import * as S from "./dockerError.style";

export function DockerErrorPage(): React.ReactNode {
  return (
    <S.ErrorContainer>
      <S.ErrorTitle>Unable to access Docker</S.ErrorTitle>
      <S.ErrorMessage>Make sure Docker is installed and running, or check if your user is in the docker group.</S.ErrorMessage>
    </S.ErrorContainer>
  );
}
