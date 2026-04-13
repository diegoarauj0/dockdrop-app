import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { dockerService } from "../../docker/services/docker.service";
import { ContainerInfo } from "dockerode";

type UseStartContainerMutationResultType = UseMutationResult<
  { success: boolean; error?: string },
  unknown,
  string,
  { previewContainers: ContainerInfo[] | undefined }
>;

export function useMutationStartContainer(): UseStartContainerMutationResultType {
  const queryClient = useQueryClient();
  const queryKey = ["docker-containers", true];

  return useMutation({
    mutationFn: (containerId: string) => dockerService.startContainer(containerId),

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

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey, exact: true });
    },

    onError: (err, _, context) => {
      console.error(err);

      const previewContainers = context?.previewContainers;

      if (!previewContainers) {
        return queryClient.invalidateQueries({ queryKey });
      }

      queryClient.setQueryData(queryKey, context.previewContainers);
    },
  });
}
