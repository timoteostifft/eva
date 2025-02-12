// Entities
import { UserJourney } from "@/core/entities/user-journey";

export interface UserJourneyRepositorySearchRequest {
  id?: string;
}

export interface UserJourneyRepository {
  find(
    filters: UserJourneyRepositorySearchRequest
  ): Promise<UserJourney | null>;
  create(userJourney: UserJourney): Promise<void>;
  update(userJourney: UserJourney): Promise<void>;
}
