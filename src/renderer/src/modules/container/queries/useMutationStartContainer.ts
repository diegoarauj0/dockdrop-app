import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { dockerClient } from "../../docker/docker.client";
import { ContainerInfo } from "dockerode";

type UseStartContainerMutationResultType = UseMutationResult<
  { result: boolean; error?: string },
  unknown,
  string,
  { previewContainers: ContainerInfo[] | undefined }
>;

export function useMutationStartContainer(): UseStartContainerMutationResultType {
  const queryClient = useQueryClient();
  const queryKey = ["docker-containers", true];

  return useMutation({
    mutationFn: (containerId: string) => dockerClient.startContainer(containerId),

    onMutate: async (containerId: string) => {
      await queryClient.cancelQueries({ queryKey });

      const previewContainers = queryClient.getQueryData<ContainerInfo[]>(queryKey);

      queryClient.setQueryData<ContainerInfo[]>(queryKey, (containers) => {
        if (!containers) return containers;

        return containers.map((container) => {
          if (container.Id !== containerId) return container;

          return {
            ...container,
            State: "running",
            Status: container.Status.replace("Exited", "Up"),
          } as ContainerInfo;
        });
      });

      return { previewContainers };
    },

    onError: (err, _, context) => {
      console.error(err);

      const previewContainers = context?.previewContainers;

      if (!previewContainers) {
        return queryClient.invalidateQueries({ queryKey });
      }

      queryClient.setQueryData(queryKey, context.previewContainers);
      return;
    },
  });
}
