// Entities
import { User } from "@/core/entities/user";

export interface UserRepositorySearchRequest {
  id?: string;
  name?: string;
}

export interface UserRepository {
  find(filters: UserRepositorySearchRequest): Promise<User | null>;
  list(filters: UserRepositorySearchRequest, page?: number): Promise<User[]>;
  create(user: User): Promise<void>;
}
