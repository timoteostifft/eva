// Repositories
import { JourneyRepository } from "@/core/repositories/journey-repository";
import { JourneyRepositorySearchRequest } from "@/core/repositories/journey-repository";

// Entities
import { Journey } from "@/core/entities/journey";

// Database
import { JourneyModel } from "@/infra/database/schema";

// Mappers
import { MongoJourneyMapper } from "@/infra/database/mappers/mongo-journey-mapper";

export class MongoJourneyRepository implements JourneyRepository {
  async find({
    id,
    name,
  }: JourneyRepositorySearchRequest): Promise<Journey | null> {
    const journey = await JourneyModel.findOne({
      ...(id && { _id: id }),
      ...(name && { name: { $regex: name, $options: "i" } }),
    });

    if (!journey) {
      return null;
    }

    return MongoJourneyMapper.toDomain(journey);
  }

  async list({ id, name }: JourneyRepositorySearchRequest): Promise<Journey[]> {
    const journeys = await JourneyModel.find({
      ...(id && { _id: id }),
      ...(name && { name: { $regex: name, $options: "i" } }),
    });

    return journeys.map(MongoJourneyMapper.toDomain);
  }

  async create(journey: Journey): Promise<void> {
    const data = MongoJourneyMapper.toMongo(journey);
    await JourneyModel.create(data);
  }
}
