// Use Cases
import { AssociateJourney } from "@/core/use-cases/associate-journey";

// Repositories
import { InMemoryJourneyRepository } from "@/test/repositories/in-memory-journey-repository";
import { InMemoryUserJourneyRepository } from "@/test/repositories/in-memory-user-journey-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

// Entities
import { makeJourney } from "@/test/factories/make-journey";
import { makeUser } from "@/test/factories/make-user";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

let sut: AssociateJourney;

let journeyRepository: InMemoryJourneyRepository;
let userRepository: InMemoryUserRepository;
let userJourneyRepository: InMemoryUserJourneyRepository;

describe("Associate Journey", () => {
  beforeEach(() => {
    journeyRepository = new InMemoryJourneyRepository();
    userRepository = new InMemoryUserRepository();
    userJourneyRepository = new InMemoryUserJourneyRepository();

    sut = new AssociateJourney(
      journeyRepository,
      userRepository,
      userJourneyRepository
    );
  });

  it("should be able to associate a journey to a user", async () => {
    const journey = makeJourney();

    await journeyRepository.create(journey);

    const user = makeUser();

    await userRepository.create(user);

    const start = new Date();

    await sut.execute({
      journey_id: journey.id.value,
      user_id: user.id.value,
      start,
    });

    expect(userJourneyRepository.userJourneys).toHaveLength(1);
    expect(userJourneyRepository.userJourneys[0].journey_id).toBe(
      journey.id.value
    );
    expect(userJourneyRepository.userJourneys[0].user_id).toBe(user.id.value);
    expect(userJourneyRepository.userJourneys[0].created_at).toBeDefined();
    expect(userJourneyRepository.userJourneys[0].created_at).toEqual(start);
  });

  it("should not be able to associate a journey to a user that does not exist", async () => {
    const journey = makeJourney();
    await journeyRepository.create(journey);

    const user = makeUser();

    await expect(
      sut.execute({
        journey_id: journey.id.value,
        user_id: user.id.value,
        start: new Date(),
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should not be able to associate a user to a journey that does not exist", async () => {
    const journey = makeJourney();

    const user = makeUser();
    await userRepository.create(user);

    await expect(
      sut.execute({
        journey_id: journey.id.value,
        user_id: user.id.value,
        start: new Date(),
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
