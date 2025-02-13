// Entities
import { Action, ActionType } from "@/core/entities/action";
import { UUID } from "@/core/entities/uuid";

// Database
import { ActionModel } from "@/infra/database/schema";

// Libraries
import { InferSchemaType } from "mongoose";

type MongoAction = InferSchemaType<typeof ActionModel.schema>;

export class MongoActionMapper {
  static toDomain(raw: MongoAction): Action {
    return Action.create({
      id: new UUID(raw._id),
      journey_id: new UUID(raw.journey_id),
      type: raw.type as ActionType,
      stage: raw.stage,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });
  }

  static toMongo(action: Action): MongoAction {
    return {
      _id: action.id.value,
      journey_id: action.journey_id.value,
      type: action.type,
      stage: action.stage,
      created_at: action.created_at,
      updated_at: action.updated_at,
    };
  }
}
