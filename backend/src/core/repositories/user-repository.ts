// Entities
import { User } from "@/core/entities/user";

export interface UserRepositorySearchRequest {
  id?: string;
}

export interface UserRepository {
  find(filters: UserRepositorySearchRequest): Promise<User | null>;
}
