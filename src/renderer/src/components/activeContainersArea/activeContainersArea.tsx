import { useContainers } from "../../hooks/reactQuery/useContainers";
import { ContainerCard } from "../containerCard/containerCard";
import * as S from "./activeContainersArea.style";

export function ActiveContainersArea(): React.ReactNode {
  const { data } = useContainers(true);

  return (
    <S.Section>
      <S.Header>
        <S.Title>Active Containers</S.Title>
        <S.Count>{data?.activeContainers.length}</S.Count>
      </S.Header>

      <S.Cards>
        {data?.activeContainers.map((container) => (
          <ContainerCard {...container} key={container.Id} />
        ))}
      </S.Cards>
    </S.Section>
  );
}
