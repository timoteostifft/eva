// Container
import { AwilixContainer, asClass } from "awilix";

// Repositories
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";
import { InMemoryUserJourneyRepository } from "@/test/repositories/in-memory-user-journey-repository";
import { InMemoryJourneyRepository } from "@/test/repositories/in-memory-journey-repository";

export function registerRepositories(container: AwilixContainer) {
  container.register({
    userRepository: asClass(InMemoryUserRepository).singleton(),
    userJourneyRepository: asClass(InMemoryUserJourneyRepository).singleton(),
    journeyRepository: asClass(InMemoryJourneyRepository).singleton(),
  });
}
