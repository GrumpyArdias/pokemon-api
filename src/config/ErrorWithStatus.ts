export class ErrorWithStatus extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, ErrorWithStatus.prototype);
  }
}
