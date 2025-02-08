// Entities
import { UserJourney } from "@/core/entities/user-journey";

export interface UserJourneyRepository {
  create(userJourney: UserJourney): Promise<void>;
}
