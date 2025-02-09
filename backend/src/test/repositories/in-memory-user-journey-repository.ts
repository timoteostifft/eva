// Entities
import { UserJourney } from "@/core/entities/user-journey";

// Repositories
import { UserJourneyRepository } from "@/core/repositories/user-journey-repository";

export class InMemoryUserJourneyRepository implements UserJourneyRepository {
  public userJourneys: UserJourney[] = [];

  async create(userJourney: UserJourney): Promise<void> {
    this.userJourneys.push(userJourney);
  }
}
