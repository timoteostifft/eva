// Entities
import { User } from "@/core/entities/user";

// Repositories
import {
  UserRepository,
  UserRepositorySearchRequest,
} from "@/core/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async find({ id, name }: UserRepositorySearchRequest): Promise<User | null> {
    const user = this.users.find((user) =>
      Boolean(
        !id ||
          user.id.equals(id) ||
          !name ||
          user.first_name.includes(name) ||
          user.last_name.includes(name)
      )
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async list(
    { id, name }: UserRepositorySearchRequest,
    page?: number
  ): Promise<User[]> {
    const users = this.users.filter((user) =>
      Boolean(
        !id ||
          user.id.equals(id) ||
          !name ||
          user.first_name.includes(name) ||
          user.last_name.includes(name)
      )
    );

    return this.paginate(users, page);
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  private paginate(users: User[], page?: number): User[] {
    if (!page) {
      return users;
    }

    return users.slice((page - 1) * 20, page * 20);
  }
}
