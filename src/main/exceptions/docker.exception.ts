import { BaseException } from "./base.exception";

export class DockerException extends BaseException<{ cause?: Error }> {
  constructor(cause?: Error) {
    super("unknown error from docker.", "DOCKER_EXCEPTION", { cause });
  }
}
