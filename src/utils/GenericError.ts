export class GenericError extends Error {
  isCustom: boolean;

  constructor() {
    const message = "An unexpected error occurred";

    super(message);
    this.name = "GenericError";
    this.isCustom = true;
  }
}