import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { DockerService } from "../../service/docker.service";
import { ContainerInfo } from "dockerode";

const dockerService = new DockerService();

type UseStopContainerMutationResult = UseMutationResult<
  { success: boolean; error?: string },
  unknown,
  string,
  { previewContainers: ContainerInfo[] | undefined }
>;

export function useStopContainer(): UseStopContainerMutationResult {
  const queryClient = useQueryClient();
  const queryKey = ["docker-containers", true];

  return useMutation({
    mutationFn: (containerId: string) => dockerService.stopContainer(containerId),

    onMutate: async (containerId: string) => {
      await queryClient.cancelQueries({ queryKey });

      const previewContainers = queryClient.getQueryData<ContainerInfo[]>(queryKey);

      queryClient.setQueryData<ContainerInfo[]>(queryKey, (containers) => {
        if (!containers) return containers;

        return containers.map((container) =>
          container.Id === containerId
            ? {
                ...container,
                State: "exited",
                Status: "Exited",
              }
            : container,
        );
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
    },
  });
}
