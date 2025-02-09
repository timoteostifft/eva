// Entities
import { User } from "@/core/entities/user";

// Repositories
import {
  UserRepository,
  UserRepositorySearchRequest,
} from "@/core/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async find({ id }: UserRepositorySearchRequest): Promise<User | null> {
    const user = this.users.find((user) => Boolean(!id || user.id.equals(id)));

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
