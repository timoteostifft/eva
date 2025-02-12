import { AwilixContainer, asClass } from "awilix";

// Services
import { BullScheduler } from "@/infra/jobs/bull-scheduler";

export function registerServices(container: AwilixContainer) {
  container.register({
    scheduler: asClass(BullScheduler).singleton(),
  });
}
