// Use Cases
import { makeUser } from "@/test/factories/make-user";
import { ListUsers } from "./list-users";

// Repositories
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

let sut: ListUsers;

let userRepository: InMemoryUserRepository;

describe("List Users", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new ListUsers(userRepository);
  });

  it("should be able to list users", async () => {
    const user = makeUser();

    await userRepository.create(user);

    const users = await sut.execute({ page: 1 });

    expect(users).toHaveLength(1);
    expect(users[0].id).toEqual(user.id);
  });

  it("should be able to list users with pagination", async () => {
    for (let i = 0; i < 22; i++) {
      const user = makeUser();

      await userRepository.create(user);
    }

    const users = await sut.execute({ page: 2 });

    expect(users).toHaveLength(2);
  });

  it("should be able to filter users by name", async () => {
    const user = makeUser({
      first_name: "John",
      last_name: "Doe",
    });

    await userRepository.create(user);

    const users = await sut.execute({ name: "John", page: 1 });

    expect(users).toHaveLength(1);
    expect(users[0].id).toEqual(user.id);
  });
});
