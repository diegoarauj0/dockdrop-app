import { AvailableContainerModulesComponent } from "../../../container/components/availableContainerModules/availableContainerModules.component";
import { SelectedContainerModulesComponent } from "../../../container/components/selectedContainerModules/selectedContainerModules.component";
import {
  InterfaceContainerModuleAbout,
  useContainerModules,
} from "../../../container/providers/containerModules/containerModules.context";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as S from "./createContainer.style";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { dockerClient } from "../../../docker/docker.client";

export function CreateContainerPageComponent(): React.ReactNode {
  const { availableContainerModules, selectedContainerModules, setConfigError, setConfigValue, clear, add } =
    useContainerModules();
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over) {
      const { about } = active.data.current as { about: InterfaceContainerModuleAbout; id: string };
      const targetArea = over.id;

      if (targetArea === "selected-container-modules") {
        add(about.type);
      }
    }
  };

  const requiredModuleNotificationId = "REQUIRED_MODULE_NOTIFICATION";
  const createContainerNotificationId = "CREATE_CONTAINER_NOTIFICATION";
  const imageNotFoundNotificationId = "IMAGE_NOT_FOUND_NOTIFICATION";

  const handleCreateContainer = async (): Promise<void> => {
    let hasError = false;

    selectedContainerModules.forEach(({ config, about, id }) => {
      about.fields.forEach(({ schema, configKey }) => {
        const { value, error } = schema.validate(config[configKey]?.value);

        if (error?.message) hasError = true;

        setConfigError(id, configKey, error?.message);
        setConfigValue(id, configKey, value);
      });
    });

    availableContainerModules.forEach(({ about }) => {
      const hasModule = selectedContainerModules.find((selectedModule) => selectedModule.type === about.type);

      if (hasModule === undefined && about.required) {
        toast(t("home_create_container.required_module", { module: about.type }), {
          toastId: requiredModuleNotificationId,
          closeButton: true,
          autoClose: 3000,
          position: "top-center",
          type: "error",
        });

        hasError = true;
      }
    });

    if (hasError) return;

    const imageModule = selectedContainerModules.find(({ type }) => type === "image");
    const nameModule = selectedContainerModules.find(({ type }) => type === "name");
    const portsModules = selectedContainerModules.filter(({ type }) => type === "port");
    const envModules = selectedContainerModules.filter(({ type }) => type === "env");

    const image = imageModule?.config["image"].value as string;
    const name = nameModule?.config["name"]?.value as string | undefined;
    const ports = portsModules.map(({ config }) => {
      return { hostPort: String(config["hostPort"].value ?? ""), containerPort: String(config["containerPort"].value ?? "") };
    });
    const envs = envModules.map(({ config }) => {
      return {
        key: String(config["key"].value ?? ""),
        value: String(config["value"].value ?? ""),
      };
    });

    toast(t("home_create_container.creating_container"), {
      toastId: createContainerNotificationId,
      isLoading: true,
    });

    if (!(await dockerClient.hasImage({ image }))) {
      toast(t("home_create_container.image_not_found_downloading", { image }), {
        toastId: imageNotFoundNotificationId,
        isLoading: true,
      });

      const result = await dockerClient.pullImage({ image });

      if (!result) {
        return toast.update(imageNotFoundNotificationId, {
          render: t("home_create_container.image_download_failed"),
          closeButton: true,
          isLoading: false,
          autoClose: 3000,
          type: "error",
        });
      }

      toast.update(imageNotFoundNotificationId, {
        render: t("home_create_container.image_download_success"),
        closeButton: true,
        isLoading: false,
        autoClose: 3000,
        type: "success",
      });
    }

    try {
      await dockerClient.createContainer({ image, name, ports, envs });

      toast.update(createContainerNotificationId, {
        render: t("home_create_container.container_created_success"),
        closeButton: true,
        isLoading: false,
        autoClose: 3000,
        type: "success",
      });
    } catch {
      toast.update(createContainerNotificationId, {
        render: t("home_create_container.container_creation_failed"),
        closeButton: true,
        isLoading: false,
        autoClose: 3000,
        type: "error",
      });
    }
  };

  return (
    <S.CreateContainerPage>
      <S.TopBar>
        <S.BackButton
          type="button"
          onClick={() => {
            navigate("/dashboard");
            clear();
          }}
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </S.BackButton>

        <S.HeaderContent>
          <S.Title>{t("home_create_container.title")}</S.Title>
        </S.HeaderContent>

        <S.CompleteButton type="button" onClick={handleCreateContainer}>
          <CheckCircle2 size={18} strokeWidth={2.25} />
          {t("home_create_container.complete")}
        </S.CompleteButton>
      </S.TopBar>

      <S.ContentGrid>
        <DndContext onDragEnd={handleDragEnd}>
          <AvailableContainerModulesComponent
            title={t("home_create_container.available_modules")}
            description={t("home_create_container.available_modules_description")}
          />
          <SelectedContainerModulesComponent badge={t("home_create_container.blueprint")} />
        </DndContext>
      </S.ContentGrid>
    </S.CreateContainerPage>
  );
}
