// Entities
import { Journey } from "@/core/entities/journey";

export interface JourneyRepositorySearchRequest {
  id?: string;
}

export interface JourneyRepository {
  find(filters: JourneyRepositorySearchRequest): Promise<Journey | null>;
  create(journey: Journey): Promise<void>;
}
