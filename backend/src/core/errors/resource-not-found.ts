// Errors
import { BaseError } from "@/core/errors/base-error";

export class ResourceNotFoundError extends BaseError {
  constructor(resource: string, identifier: string) {
    super(`${resource} ${identifier} não existe.`, "resource-not-found");
  }
}
