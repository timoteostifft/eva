// Libraries
import { createContainer } from "awilix";

// Container
import { registerUseCases } from "@/infra/container/use-cases";
import { registerRepositories } from "@/infra/container/repositories";
import { registerServices } from "@/infra/container/services";

export const container = createContainer();

registerUseCases(container);
registerServices(container);
registerRepositories(container);
