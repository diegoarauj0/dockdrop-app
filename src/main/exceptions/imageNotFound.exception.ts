import { BaseException } from "./base.exception";

export class ImageNotFoundException extends BaseException<{ imageName: string }> {
  constructor(imageName: string) {
    super("image not found.", "IMAGE_NOT_FOUND", { imageName });
  }
}
