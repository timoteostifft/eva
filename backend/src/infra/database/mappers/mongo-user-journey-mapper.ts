// Entities
import { UserJourney, UserJourneyStatus } from "@/core/entities/user-journey";
import { UUID } from "@/core/entities/uuid";

// Database
import { UserJourneyModel } from "@/infra/database/schema";

// Libraries
import { InferSchemaType } from "mongoose";

type MongoUserJourney = InferSchemaType<typeof UserJourneyModel.schema>;

export class MongoUserJourneyMapper {
  static toDomain(raw: MongoUserJourney): UserJourney {
    return UserJourney.create({
      id: new UUID(raw._id),
      user_id: new UUID(raw.user_id),
      journey_id: new UUID(raw.journey_id),
      status: raw.status as UserJourneyStatus,
      start_at: raw.start_at,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });
  }

  static toMongo(userJourney: UserJourney): MongoUserJourney {
    return {
      _id: userJourney.id.value,
      user_id: userJourney.user_id.value,
      journey_id: userJourney.journey_id.value,
      stage: userJourney.stage,
      status: userJourney.status,
      start_at: userJourney.start_at,
      created_at: userJourney.created_at,
      updated_at: userJourney.updated_at,
    };
  }
}
