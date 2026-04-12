import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { ISettings, SettingsService } from "../../service/settings.service";

const settingsService = new SettingsService();

interface ISetSettingInput {
  key: keyof ISettings;
  value: ISettings[keyof ISettings];
}

type UseSetSettingsResult = UseMutationResult<void, unknown, ISetSettingInput, { previousSettings: ISettings | undefined }>;

export function useSetSetting(): UseSetSettingsResult {
  const queryClient = useQueryClient();
  const queryKey = ["settings"];

  return useMutation({
    mutationFn: ({ key, value }: ISetSettingInput) => settingsService.set(key, value),

    onMutate: async ({ key, value }: ISetSettingInput) => {
      await queryClient.cancelQueries({ queryKey });

      const previousSettings = queryClient.getQueryData<ISettings>(queryKey);

      queryClient.setQueryData<ISettings>(queryKey, (old) => {
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
