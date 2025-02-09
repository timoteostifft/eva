// Libraries
import { createContainer } from "awilix";

// Container
import { registerUseCases } from "@/infra/container/use-cases";
import { registerRepositories } from "./repositories";

export const container = createContainer();

registerUseCases(container);
registerRepositories(container);
