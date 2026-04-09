import { ContainerCard } from "../containerCard/containerCard";
import * as S from "./inactiveContainersArea.style";

const inactiveContainers = [
  {
    name: "nginx-proxy",
    image: "nginx:latest",
    cpu: "1.5%",
    ram: "45MB",
    uptime: "45D 1H",
  },
  {
    name: "worker-jobs",
    image: "python:3.12",
    cpu: "0.2%",
    ram: "31MB",
    uptime: "2D 10H",
  },
  {
    name: "redis-cache",
    image: "redis:7",
    cpu: "0.0%",
    ram: "12MB",
    uptime: "0D 0H",
  },
];

export function InactiveContainersArea() {
  return (
    <S.Section>
      <S.Header>
        <S.Title>Inactive Containers</S.Title>
        <S.Count>{inactiveContainers.length}</S.Count>
      </S.Header>

      <S.Cards>
        {inactiveContainers.map((container) => (
          <ContainerCard container={container} key={container.name} status="inactive" />
        ))}
      </S.Cards>
    </S.Section>
  );
}
