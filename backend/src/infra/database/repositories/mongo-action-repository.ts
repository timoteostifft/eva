// Entities
import { Action } from "@/core/entities/action";

// Repositories
import {
  ActionRepository,
  ActionRepositorySearchRequest,
} from "@/core/repositories/action-repository";

// Database
import { ActionModel } from "@/infra/database/schema";

// Mappers
import { MongoActionMapper } from "@/infra/database/mappers/mongo-action-mapper";

export class MongoActionRepository implements ActionRepository {
  async find({
    journey_id,
    stage,
  }: ActionRepositorySearchRequest): Promise<Action | null> {
    const data = await ActionModel.findOne({
      ...(journey_id && { journey_id }),
      ...(stage && { stage }),
    });

    if (!data) {
      return null;
    }

    return MongoActionMapper.toDomain(data);
  }

  async create(action: Action): Promise<void> {
    const data = MongoActionMapper.toMongo(action);
    await ActionModel.create(data);
  }
}
