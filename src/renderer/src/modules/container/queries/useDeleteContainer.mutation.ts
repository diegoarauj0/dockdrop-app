import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { ContainerInfo } from "dockerode";
import { dockerClient } from "../../docker/docker.client";

type UseDeleteMutationResultType = UseMutationResult<
  boolean,
  unknown,
  string,
  { previewContainers: ContainerInfo[] | undefined }
>;

export function useMutationDeleteContainer(): UseDeleteMutationResultType {
  const queryClient = useQueryClient();
  const queryKey = ["docker-containers", true];

  return useMutation({
    mutationFn: (containerId: string) => dockerClient.deleteContainer(containerId),

    onMutate: async (containerId: string) => {
      await queryClient.invalidateQueries({ queryKey });

      const previewContainers = queryClient.getQueryData<ContainerInfo[]>(queryKey);

      queryClient.setQueryData<ContainerInfo[]>(queryKey, (containers) => {
        if (!containers) return containers;

        const filteredContainers = containers.filter(({ Id }) => Id !== containerId);

        return filteredContainers;
      });

      return { previewContainers };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },

    onError: (err, _, context) => {
      console.error(err);

      const previewContainers = context?.previewContainers;
      if (!previewContainers) return;

      queryClient.setQueryData(queryKey, previewContainers);
    },
  });
}
