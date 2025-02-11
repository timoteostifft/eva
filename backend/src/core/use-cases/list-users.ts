import { UserRepository } from "@/core/repositories/user-repository";

interface ListUsersRequest {
  name?: string;
  page: number;
}

export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, page }: ListUsersRequest) {
    const users = await this.userRepository.list({ name }, page);

    return users;
  }
}
