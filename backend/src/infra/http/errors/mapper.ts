import { BaseError } from "@/core/errors/base-error";

export const mapper: Record<BaseError["code"], number> = {
  "resource-not-found": 404,
};
