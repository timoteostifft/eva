// Entities
import { UserJourney } from "@/core/entities/user-journey";

// Repositories
import {
  UserJourneyRepository,
  UserJourneyRepositorySearchRequest,
} from "@/core/repositories/user-journey-repository";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

export class InMemoryUserJourneyRepository implements UserJourneyRepository {
  public userJourneys: UserJourney[] = [];

  async find({
    id,
  }: UserJourneyRepositorySearchRequest): Promise<UserJourney | null> {
    const userJourney = this.userJourneys.find((userJourney) =>
      Boolean(!id || userJourney.id.equals(id))
    );

    if (!userJourney) {
      return null;
    }

    return userJourney;
  }

  async create(userJourney: UserJourney): Promise<void> {
    this.userJourneys.push(userJourney);
  }

  async update(userJourney: UserJourney): Promise<void> {
    const index = this.userJourneys.findIndex((userJourney) =>
      userJourney.id.equals(userJourney.id)
    );

    this.userJourneys[index] = userJourney;
  }
}
