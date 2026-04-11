import { useContainers } from "../../hooks/reactQuery/useContainers";
import { ContainerCard } from "../containerCard/containerCard";
import * as S from "./inactiveContainersArea.style";

export function InactiveContainersArea(): React.ReactNode {
  const { data } = useContainers(true);

  return (
    <S.Section>
      <S.Header>
        <S.Title>Inactive Containers</S.Title>
        <S.Count>{data?.inactiveContainers.length}</S.Count>
      </S.Header>

      <S.Cards>
        {data?.inactiveContainers.map((container) => (
          <ContainerCard {...container} key={container.Id} />
        ))}
      </S.Cards>
    </S.Section>
  );
}
