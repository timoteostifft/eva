// Entities
import { Journey } from "@/core/entities/journey";

// Repositories
import {
  JourneyRepository,
  JourneyRepositorySearchRequest,
} from "@/core/repositories/journey-repository";

export class InMemoryJourneyRepository implements JourneyRepository {
  public journeys: Journey[] = [];

  async find({ id }: JourneyRepositorySearchRequest): Promise<Journey | null> {
    const journey = this.journeys.find((journey) =>
      Boolean(!id || journey.id.equals(id))
    );

    if (!journey) {
      return null;
    }

    return journey;
  }

  async create(journey: Journey): Promise<void> {
    this.journeys.push(journey);
  }
}
