// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

// Repositories
import { JourneyRepository } from "@/core/repositories/journey-repository";
import { UserRepository } from "@/core/repositories/user-repository";
import { UserJourneyRepository } from "@/core/repositories/user-journey-repository";

// Entities
import { UserJourney } from "@/core/entities/user-journey";
import { UUID } from "@/core/entities/uuid";
import { Journey } from "@/core/entities/journey";
import { User } from "@/core/entities/user";

interface AssociateJourneyRequest {
  journey_id: string;
  user_id: string;
  start: Date;
}

export class AssociateJourney {
  constructor(
    private journeyRepository: JourneyRepository,
    private userRepository: UserRepository,
    private userJourneyRepository: UserJourneyRepository
  ) {}

  async execute({ journey_id, user_id, start }: AssociateJourneyRequest) {
    const journey = await this.journeyRepository.find({
      id: journey_id,
    });

    if (!journey) {
      throw new ResourceNotFoundError("journey", journey_id);
    }

    const user = await this.userRepository.find({ id: user_id });

    if (!user) {
      throw new ResourceNotFoundError("user", user_id);
    }

    const userJourney = UserJourney.create({
      user_id: new UUID(user.id.value),
      journey_id: new UUID(journey.id.value),
      start,
    });

    await this.userJourneyRepository.create(userJourney);
  }
}
