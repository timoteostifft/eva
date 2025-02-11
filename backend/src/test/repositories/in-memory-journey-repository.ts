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

  async list(
    filters: JourneyRepositorySearchRequest,
    page?: number
  ): Promise<Journey[]> {
    const journeys = this.journeys.filter((journey) =>
      Boolean(!filters.name || journey.name.includes(filters.name))
    );

    return this.paginate(journeys, page);
  }

  async create(journey: Journey): Promise<void> {
    this.journeys.push(journey);
  }

  private paginate(journeys: Journey[], page?: number): Journey[] {
    if (!page) {
      return journeys;
    }

    return journeys.slice((page - 1) * 20, page * 20);
  }
}
