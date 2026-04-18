import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { dockerClient } from "../docker.client";

export function usePingQuery(): UseQueryResult<true> {
  return useQuery({
    queryKey: ["docker-ping"],
    queryFn: () => dockerClient.ping(),
    refetchInterval: 5000,
  });
}
