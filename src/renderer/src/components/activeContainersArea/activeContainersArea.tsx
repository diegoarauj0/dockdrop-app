import { ContainerCard } from "../containerCard/containerCard";
import * as S from "./activeContainersArea.style";
import { ContainerInfo } from "dockerode";

interface ActiveContainersAreaProps {
  containers: ContainerInfo[];
}

export function ActiveContainersArea({ containers }: ActiveContainersAreaProps): React.ReactNode {
  return (
    <S.Section>
      <S.Header>
        <S.Title>Active Containers</S.Title>
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
