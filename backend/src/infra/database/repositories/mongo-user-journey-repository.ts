// Repositories
import {
  UserJourneyRepository,
  UserJourneyRepositorySearchRequest,
} from "@/core/repositories/user-journey-repository";

// Entities
import { UserJourney } from "@/core/entities/user-journey";

// Database
import { UserJourneyModel } from "@/infra/database/schema";

// Mappers
import { MongoUserJourneyMapper } from "@/infra/database/mappers/mongo-user-journey-mapper";

export class MongoUserJourneyRepository implements UserJourneyRepository {
  async find({
    id,
  }: UserJourneyRepositorySearchRequest): Promise<UserJourney | null> {
    const data = await UserJourneyModel.findOne({
      ...(id && { _id: id }),
    });

    if (!data) {
      return null;
    }

    return MongoUserJourneyMapper.toDomain(data);
  }

  async create(userJourney: UserJourney): Promise<void> {
    const data = MongoUserJourneyMapper.toMongo(userJourney);
    await UserJourneyModel.create(data);
  }

  async update(userJourney: UserJourney): Promise<void> {
    const data = MongoUserJourneyMapper.toMongo(userJourney);
    await UserJourneyModel.findByIdAndUpdate(userJourney.id.value, data);
  }
}
