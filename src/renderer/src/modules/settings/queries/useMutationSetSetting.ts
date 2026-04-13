import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { InterfaceSettings, settingsService } from "../settings.service";

interface InterfaceSetSettingInput {
  value: InterfaceSettings[keyof InterfaceSettings];
  key: keyof InterfaceSettings;
}

type UseSetSettingsResultType = UseMutationResult<
  void,
  unknown,
  InterfaceSetSettingInput,
  { previousSettings: InterfaceSettings | undefined }
>;

export function useMutationSetSetting(): UseSetSettingsResultType {
  const queryClient = useQueryClient();
  const queryKey = ["settings"];

  return useMutation({
    mutationFn: ({ key, value }: InterfaceSetSettingInput) => settingsService.set(key, value),

    onMutate: async ({ key, value }: InterfaceSetSettingInput) => {
      await queryClient.cancelQueries({ queryKey });

      const previousSettings = queryClient.getQueryData<InterfaceSettings>(queryKey);

      queryClient.setQueryData<InterfaceSettings>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          [key]: value,
        };
      });

      return { previousSettings };
    },

    onError: (_err, _input, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(queryKey, context.previousSettings);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
