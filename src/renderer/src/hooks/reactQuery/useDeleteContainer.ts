import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { DockerService } from "../../service/docker.service";
import { ContainerInfo } from "dockerode";

const dockerService = new DockerService();

type UseDeleteMutationResult = UseMutationResult<
  { success: boolean; error?: string },
  unknown,
  string,
  { previewContainers: ContainerInfo[] | undefined }
>;

export function useDeleteContainer(): UseDeleteMutationResult {
  const queryClient = useQueryClient();
  const queryKey = ["docker-containers", true];

  return useMutation({
    mutationFn: (containerId: string) => dockerService.deleteContainer(containerId),

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
