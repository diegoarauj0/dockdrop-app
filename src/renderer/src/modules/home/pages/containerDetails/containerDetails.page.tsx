import { useContainersQuery } from "../../../container/queries/useContainers.query";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Box, Disc3, Terminal, Network, Calendar, Hash, Plug } from "lucide-react";
import * as S from "./containerDetails.style";

const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function ContainerDetailsPage(): React.ReactNode | null {
  const { containerId } = useParams<{ containerId: string }>();
  const { data: containersData } = useContainersQuery();
  const { t } = useTranslation("container");
  const navigate = useNavigate();

  const container = containersData?.containers?.find((c) => c.Id === containerId);

  if (!containerId || !container) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const containerName = container.Names[0].replace("/", "");

  return (
    <S.PageWrapper>
      <S.TopBar>
        <S.BackButton onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={24} />
        </S.BackButton>
        <S.HeaderContent>
          <S.Title>{containerName}</S.Title>
        </S.HeaderContent>
        <S.StatusBadge $state={container.State}>
          <Box size={14} />
          {t(`status.${container.State}`)}
        </S.StatusBadge>
      </S.TopBar>

      <S.InfoGrid>
        <S.InfoItem>
          <S.InfoItemIcon>
            <Disc3 />
          </S.InfoItemIcon>
          <S.InfoItemTitle>Image</S.InfoItemTitle>
          <S.InfoItemValue>{container.Image}</S.InfoItemValue>
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItemIcon>
            <Hash />
          </S.InfoItemIcon>
          <S.InfoItemTitle>ID</S.InfoItemTitle>
          <S.InfoItemValue>{container.Id.substring(0, 12)}</S.InfoItemValue>
        </S.InfoItem>

        {container.Ports.map(({ PrivatePort, PublicPort }, index) => (
          <S.InfoItem key={index}>
            <S.InfoItemIcon>
              <Network />
            </S.InfoItemIcon>
            <S.InfoItemTitle>Ports {index + 1}</S.InfoItemTitle>
            <S.InfoItemValue>{`${PrivatePort || "-"} | ${PublicPort || "-"}`}</S.InfoItemValue>
          </S.InfoItem>
        ))}

        <S.InfoItem>
          <S.InfoItemIcon>
            <Calendar />
          </S.InfoItemIcon>
          <S.InfoItemTitle>Created</S.InfoItemTitle>
          <S.InfoItemValue>{formatDate(container.Created)}</S.InfoItemValue>
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItemIcon>
            <Terminal />
          </S.InfoItemIcon>
          <S.InfoItemTitle>Command</S.InfoItemTitle>
          <S.InfoItemValue>{container.Command || "-"}</S.InfoItemValue>
        </S.InfoItem>

        <S.InfoItem>
          <S.InfoItemIcon>
            <Plug />
          </S.InfoItemIcon>
          <S.InfoItemTitle>Status</S.InfoItemTitle>
          <S.InfoItemValue>{container.Status}</S.InfoItemValue>
        </S.InfoItem>
      </S.InfoGrid>
    </S.PageWrapper>
  );
}
