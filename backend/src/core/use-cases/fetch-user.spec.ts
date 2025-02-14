// Repositories
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

// Use Cases
import { FetchUser } from "@/core/use-cases/fetch-user";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

// Factories
import { makeUser } from "@/test/factories/make-user";

let sut: FetchUser;
let userRepository: InMemoryUserRepository;

describe("Fetch User", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new FetchUser(userRepository);
  });

  it("should be able to fetch a user", async () => {
    const user = makeUser();

    await userRepository.create(user);

    const fetchedUser = await sut.execute({ id: user.id.value });

    expect(fetchedUser.id.value).toEqual(user.id.value);
  });

  it("should not be able to fetch a non-existent user", async () => {
    await expect(sut.execute({ id: "non-existent-id" })).rejects.toThrow(
      ResourceNotFoundError
    );
  });
});
