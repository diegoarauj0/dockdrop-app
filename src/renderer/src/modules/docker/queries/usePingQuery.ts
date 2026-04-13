import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { dockerService } from "../services/docker.service";

export function usePingQuery(): UseQueryResult<{ success: boolean }> {
  return useQuery({
    queryKey: ["docker-ping"],
    queryFn: dockerService.ping,
    refetchInterval: 5000,
  });
}
