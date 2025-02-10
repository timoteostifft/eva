// Repositories
import { UserJourneyRepository } from "@/core/repositories/user-journey-repository";

// Entities
import { UserJourney } from "@/core/entities/user-journey";

// Database
import { UserJourneyModel } from "@/infra/database/schema";

// Mappers
import { MongoUserJourneyMapper } from "@/infra/database/mappers/mongo-user-journey-mapper";

export class MongoUserJourneyRepository implements UserJourneyRepository {
  async create(userJourney: UserJourney): Promise<void> {
    const data = MongoUserJourneyMapper.toMongo(userJourney);
    await UserJourneyModel.create(data);
  }
}
