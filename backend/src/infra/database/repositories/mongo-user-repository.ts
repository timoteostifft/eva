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
  async find({ id, name }: UserRepositorySearchRequest): Promise<User | null> {
    const user = await UserModel.findOne({
      ...(id && { _id: id }),
      ...(name && {
        $or: [
          { first_name: { $regex: name, $options: "i" } },
          { last_name: { $regex: name, $options: "i" } },
        ],
      }),
    });

    if (!user) {
      return null;
    }

    return MongoUserMapper.toDomain(user);
  }

  async list(
    { id, name }: UserRepositorySearchRequest,
    page?: number
  ): Promise<User[]> {
    const users = await UserModel.find({
      ...(id && { _id: id }),
      ...(name && {
        $or: [
          { first_name: { $regex: name, $options: "i" } },
          { last_name: { $regex: name, $options: "i" } },
        ],
      }),
    })
      .skip(page ? (page - 1) * 20 : 0)
      .limit(20);

    return users.map(MongoUserMapper.toDomain);
  }

  async create(user: User): Promise<void> {
    const data = MongoUserMapper.toMongo(user);

    await UserModel.create(data);
  }
}
