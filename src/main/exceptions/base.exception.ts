export class BaseException<Details> extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Details,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
