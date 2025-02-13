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

// Jobs
import { MockedScheduler } from "@/test/jobs/mocked-scheduler";

let sut: AssociateJourney;

let journeyRepository: InMemoryJourneyRepository;
let userRepository: InMemoryUserRepository;
let userJourneyRepository: InMemoryUserJourneyRepository;
let scheduler: MockedScheduler;

describe("Associate Journey", () => {
  beforeEach(() => {
    journeyRepository = new InMemoryJourneyRepository();
    userRepository = new InMemoryUserRepository();
    userJourneyRepository = new InMemoryUserJourneyRepository();

    scheduler = new MockedScheduler();

    sut = new AssociateJourney(
      journeyRepository,
      userRepository,
      userJourneyRepository,
      scheduler
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
      start_at: start,
    });

    expect(userJourneyRepository.userJourneys).toHaveLength(1);
    expect(userJourneyRepository.userJourneys[0].journey_id.value).toBe(
      journey.id.value
    );
    expect(userJourneyRepository.userJourneys[0].user_id.value).toBe(
      user.id.value
    );
    expect(userJourneyRepository.userJourneys[0].created_at).toBeDefined();
    expect(userJourneyRepository.userJourneys[0].created_at).toEqual(start);
    expect(scheduler.jobs).toHaveLength(1);
    expect(scheduler.jobs[0].name).toBe("dispatch-journey");
    expect(scheduler.jobs[0].params).toEqual({
      user_journey_id: userJourneyRepository.userJourneys[0].id.value,
    });
  });

  it("should not be able to associate a journey to a user that does not exist", async () => {
    const journey = makeJourney();
    await journeyRepository.create(journey);

    const user = makeUser();

    await expect(
      sut.execute({
        journey_id: journey.id.value,
        user_id: user.id.value,
        start_at: new Date(),
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
        start_at: new Date(),
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
