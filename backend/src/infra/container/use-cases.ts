// Libraries
import { AwilixContainer, asFunction } from "awilix";

// Use Cases
import { ListUsers } from "@/core/use-cases/list-users";
import { ListJourneys } from "@/core/use-cases/list-journeys";
import { AssociateJourney } from "@/core/use-cases/associate-journey";
import { DispatchJourney } from "@/core/use-cases/dispatch-journey";
import { FetchUser } from "@/core/use-cases/fetch-user";
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
    dispatchJourney: asFunction(
      ({
        userJourneyRepository,
        journeyRepository,
        actionRepository,
        userRepository,
        templateRepository,
        scheduler,
        mailer,
        messageProvider,

        smsProvider,
      }) =>
        new DispatchJourney(
          userJourneyRepository,
          journeyRepository,
          actionRepository,
          userRepository,
          templateRepository,
          scheduler,
          mailer,
          messageProvider,
          smsProvider
        )
    ).singleton(),
    fetchUser: asFunction(
      ({ userRepository }) => new FetchUser(userRepository)
    ).singleton(),
  });
}
