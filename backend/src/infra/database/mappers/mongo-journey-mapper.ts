// Entities
import { Journey } from "@/core/entities/journey";
import { UUID } from "@/core/entities/uuid";

// Database
import { JourneyModel } from "@/infra/database/schema";

// Libraries
import { InferSchemaType } from "mongoose";

type MongoJourney = InferSchemaType<typeof JourneyModel.schema>;

export class MongoJourneyMapper {
  static toDomain(raw: MongoJourney): Journey {
    return Journey.create({
      id: new UUID(raw._id),
      name: raw.name,
      description: raw.description,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });
  }

  static toMongo(journey: Journey): MongoJourney {
    return {
      _id: journey.id.value,
      name: journey.name,
      description: journey.description,
      created_at: journey.created_at,
      updated_at: journey.updated_at,
    };
  }
}
