// Libraries
import { asClass, asFunction } from "awilix";

// Use Cases
import { ListUsers } from "@/core/use-cases/list-users";
import { AssociateJourney } from "@/core/use-cases/associate-journey";

// Container
import { AwilixContainer } from "awilix";

export function registerUseCases(container: AwilixContainer) {
  container.register({
    listUsers: asFunction(
      ({ userRepository }) => new ListUsers(userRepository)
    ).singleton(),
    associateJourney: asFunction(
      ({ journeyRepository, userRepository, userJourneyRepository }) =>
        new AssociateJourney(
          journeyRepository,
          userRepository,
          userJourneyRepository
        )
    ).singleton(),
  });
}
