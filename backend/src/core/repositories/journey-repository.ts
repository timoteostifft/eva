// Entities
import { Journey } from "@/core/entities/journey";

export interface JourneyRepositorySearchRequest {
  id?: string;
  name?: string;
}

export interface JourneyRepository {
  find(filters: JourneyRepositorySearchRequest): Promise<Journey | null>;
  list(
    filters: JourneyRepositorySearchRequest,
    page?: number
  ): Promise<Journey[]>;
  create(journey: Journey): Promise<void>;
}
