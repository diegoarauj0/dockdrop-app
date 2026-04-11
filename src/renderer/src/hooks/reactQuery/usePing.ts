import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DockerService } from "../../service/docker.service";

export function usePing(): UseQueryResult<{ success: boolean }> {
  const dockerService = new DockerService();

  return useQuery({
    queryKey: ["docker-ping"],
    queryFn: dockerService.ping,
    refetchInterval: 5000,
  });
}
