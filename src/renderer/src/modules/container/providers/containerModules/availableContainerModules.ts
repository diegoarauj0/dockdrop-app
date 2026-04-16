import { InterfaceAvailableContainerModule } from "./containerModules.context";
import { Container, Disc3, Network, Variable } from "lucide-react";
import Joi from "joi";

export const availableContainerModules: InterfaceAvailableContainerModule[] = [
  {
    id: "image-id",
    type: "image",
    about: {
      label: "Docker Image",
      icon: Disc3,
      type: "image",
      required: true,
      unique: true,
      fields: [
        {
          configKey: "image",
          label: "Image",
          placeholder: "nginx:latest",
          type: "text",
          schema: Joi.string().required().min(1).max(64),
        },
      ],
    },
  },
  {
    id: "name-id",
    type: "name",
    about: {
      label: "Container Name",
      icon: Container,
      type: "name",
      required: false,
      unique: true,
      fields: [
        {
          configKey: "name",
          label: "Name",
          placeholder: "my-container",
          type: "text",
          schema: Joi.string().required().min(1).max(64),
        },
      ],
    },
  },
  {
    id: "port-id",
    type: "port",
    about: {
      label: "Port Mapping",
      icon: Network,
      type: "port",
      required: false,
      unique: false,
      fields: [
        {
          configKey: "hostPort",
          label: "Input Port",
          placeholder: "8080",
          type: "number",
          schema: Joi.number().required().min(1).max(65535),
        },
        {
          configKey: "containerPort",
          label: "Output Port",
          placeholder: "80",
          type: "number",
          schema: Joi.number().required().min(1).max(65535),
        },
      ],
    },
  },
  {
    id: "env-id",
    type: "env",
    about: {
      label: "Environment Variable",
      icon: Variable,
      type: "env",
      required: false,
      unique: false,
      fields: [
        {
          configKey: "key",
          label: "Key",
          placeholder: "NODE_ENV",
          type: "text",
          schema: Joi.string()
            .trim()
            .required()
            .min(1)
            .max(128)
            .pattern(/^[A-Za-z_][A-Za-z0-9_]*$/),
        },
        {
          configKey: "value",
          label: "Value",
          placeholder: "production",
          type: "text",
          schema: Joi.string().allow("").max(1024).required(),
        },
      ],
    },
  },
];
