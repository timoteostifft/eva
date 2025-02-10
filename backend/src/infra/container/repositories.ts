// Container
import { AwilixContainer, asClass } from "awilix";

// Repositories
import { MongoUserRepository } from "@/infra/database/repositories/mongo-user-repository";
import { MongoUserJourneyRepository } from "@/infra/database/repositories/mongo-user-journey-repository";
import { MongoJourneyRepository } from "@/infra/database/repositories/mongo-journey-repository";

export function registerRepositories(container: AwilixContainer) {
  container.register({
    userRepository: asClass(MongoUserRepository).singleton(),
    userJourneyRepository: asClass(MongoUserJourneyRepository).singleton(),
    journeyRepository: asClass(MongoJourneyRepository).singleton(),
  });
}
