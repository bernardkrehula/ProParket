export class GenericError extends Error {
  isCustom: boolean;

  constructor(detail?: string) {
    const message = detail?.trim() || "An unexpected error occurred";

    super(message);
    this.name = "GenericError";
    this.isCustom = true;
  }
}