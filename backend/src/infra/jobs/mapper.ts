// Entities
import { Job } from "@/core/entities/job";

// Container
import { container } from "@/infra/container";

export const mapper: Record<
  Job["name"],
  (params: Job["params"]) => Promise<void>
> = {
  "dispatch-journey": (params) =>
    container.resolve("dispatchJourney").execute(params),
};
