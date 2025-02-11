import { JourneyRepository } from "@/core/repositories/journey-repository";

interface ListJourneysRequest {
  name?: string;
  page: number;
}

export class ListJourneys {
  constructor(private journeyRepository: JourneyRepository) {}

  async execute({ name, page }: ListJourneysRequest) {
    const journeys = await this.journeyRepository.list({ name }, page);

    return journeys;
  }
}
