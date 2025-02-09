// Libraries
import { asClass, asFunction } from "awilix";

// Use Cases
import { AssociateJourney } from "@/core/use-cases/associate-journey";

// Container
import { AwilixContainer } from "awilix";

export function registerUseCases(container: AwilixContainer) {
  container.register({
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
