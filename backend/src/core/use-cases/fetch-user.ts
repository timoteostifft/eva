// Repositories
import { UserRepository } from "@/core/repositories/user-repository";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

interface FetchUserRequest {
  id: string;
}

export class FetchUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: FetchUserRequest) {
    const user = await this.userRepository.find({ id });

    if (!user) {
      throw new ResourceNotFoundError("user", id);
    }

    return user;
  }
}
