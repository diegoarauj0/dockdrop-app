import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DockerodeService } from "../../service/dockerode.service";

export function usePing(): UseQueryResult<{ success: boolean }> {
  const dockerodeService = new DockerodeService();

  return useQuery({
    queryKey: ["docker-ping"],
    queryFn: dockerodeService.ping,
    refetchInterval: 5000,
  });
}
