import { ContainerCard } from "../containerCard/containerCard";
import * as S from "./inactiveContainersArea.style";
import { ContainerInfo } from "dockerode";

interface InactiveContainersAreaProps {
  containers: ContainerInfo[];
}

export function InactiveContainersArea({ containers }: InactiveContainersAreaProps): React.ReactNode {
  return (
    <S.Section>
      <S.Header>
        <S.Title>Inactive Containers</S.Title>
        <S.Count>{containers.length}</S.Count>
      </S.Header>

      <S.Cards>
        {containers.map((container) => (
          <ContainerCard {...container} key={container.Id} />
        ))}
      </S.Cards>
    </S.Section>
  );
}
