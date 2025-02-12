// Libraries
import { asClass, asFunction } from "awilix";

// Use Cases
import { ListUsers } from "@/core/use-cases/list-users";
import { ListJourneys } from "@/core/use-cases/list-journeys";
import { AssociateJourney } from "@/core/use-cases/associate-journey";

// Container
import { AwilixContainer } from "awilix";

export function registerUseCases(container: AwilixContainer) {
  container.register({
    listUsers: asFunction(
      ({ userRepository }) => new ListUsers(userRepository)
    ).singleton(),
    listJourneys: asFunction(
      ({ journeyRepository }) => new ListJourneys(journeyRepository)
    ).singleton(),
    associateJourney: asFunction(
      ({
        journeyRepository,
        userRepository,
        userJourneyRepository,
        scheduler,
      }) =>
        new AssociateJourney(
          journeyRepository,
          userRepository,
          userJourneyRepository,
          scheduler
        )
    ).singleton(),
  });
}
