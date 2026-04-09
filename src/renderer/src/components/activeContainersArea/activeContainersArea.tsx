import { ContainerCard } from "../containerCard/containerCard";
import * as S from "./activeContainersArea.style";

const activeContainers = [
  {
    name: "nginx-proxy",
    image: "nginx:latest",
    cpu: "1.5%",
    ram: "45MB",
    uptime: "45D 1H",
  },
  {
    name: "api-gateway",
    image: "node:20-alpine",
    cpu: "2.1%",
    ram: "128MB",
    uptime: "12D 8H",
  },
  {
    name: "postgres-db",
    image: "postgres:16",
    cpu: "0.9%",
    ram: "256MB",
    uptime: "32D 4H",
  },
];

export function ActiveContainersArea() {
  return (
    <S.Section>
      <S.Header>
        <S.Title>Active Containers</S.Title>
        <S.Count>{activeContainers.length}</S.Count>
      </S.Header>

      <S.Cards>
        {activeContainers.map((container) => (
          <ContainerCard container={container} key={container.name} status="active" />
        ))}
      </S.Cards>
    </S.Section>
  );
}
