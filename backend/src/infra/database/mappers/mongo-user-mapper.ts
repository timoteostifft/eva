// Entities
import { User } from "@/core/entities/user";
import { UUID } from "@/core/entities/uuid";

// Libraries
import { InferSchemaType } from "mongoose";

// Database
import { UserModel } from "@/infra/database/schema";

type MongoUser = InferSchemaType<typeof UserModel.schema>;

export class MongoUserMapper {
  static toDomain(raw: MongoUser): User {
    return User.create({
      id: new UUID(raw._id),
      first_name: raw.first_name,
      last_name: raw.last_name,
      email: raw.email,
      phone: raw.phone,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });
  }

  static toMongo(user: User): MongoUser {
    return {
      _id: user.id.value,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
