// Repositories
import { InMemoryJourneyRepository } from "@/test/repositories/in-memory-journey-repository";

// Use Cases
import { ListJourneys } from "./list-journeys";

// Factories
import { makeJourney } from "@/test/factories/make-journey";

let journeyRepository: InMemoryJourneyRepository;

let sut: ListJourneys;

describe("List Journeys", () => {
  beforeEach(() => {
    journeyRepository = new InMemoryJourneyRepository();
    sut = new ListJourneys(journeyRepository);
  });

  it("should be able to list journeys", async () => {
    const journey = makeJourney();

    await journeyRepository.create(journey);

    const journeys = await sut.execute({ page: 1 });

    expect(journeys).toHaveLength(1);
  });

  it("should be able to list journeys with pagination", async () => {
    for (let i = 0; i < 22; i++) {
      const journey = makeJourney();

      await journeyRepository.create(journey);
    }

    const journeys = await sut.execute({ page: 2 });

    expect(journeys).toHaveLength(2);
  });

  it("should be able to filter journeys by name", async () => {
    const journey = makeJourney({
      name: "Journey 1",
    });

    await journeyRepository.create(journey);

    const journeys = await sut.execute({ name: "Journey 1", page: 1 });

    expect(journeys).toHaveLength(1);
  });
});
