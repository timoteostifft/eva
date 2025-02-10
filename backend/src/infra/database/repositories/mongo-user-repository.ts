// Repositories
import {
  UserRepository,
  UserRepositorySearchRequest,
} from "@/core/repositories/user-repository";

// Entities
import { User } from "@/core/entities/user";

// Database
import { UserModel } from "@/infra/database/schema";

// Mappers
import { MongoUserMapper } from "@/infra/database/mappers/mongo-user-mapper";

export class MongoUserRepository implements UserRepository {
  async find({ id }: UserRepositorySearchRequest): Promise<User | null> {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return null;
    }

    return MongoUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const data = MongoUserMapper.toMongo(user);

    await UserModel.create(data);
  }
}
