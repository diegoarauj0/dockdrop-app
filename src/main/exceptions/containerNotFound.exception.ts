import { BaseException } from "./base.exception";

export class ContainerNotFoundException extends BaseException<{ containerId: string }> {
  constructor(containerId: string) {
    super("container not found.", "CONTAINER_NOT_FOUND", { containerId });
  }
}
