// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

// Repositories
import { JourneyRepository } from "@/core/repositories/journey-repository";
import { UserRepository } from "@/core/repositories/user-repository";
import { UserJourneyRepository } from "@/core/repositories/user-journey-repository";

// Entities
import { UserJourney } from "@/core/entities/user-journey";
import { UUID } from "@/core/entities/uuid";
import { Job } from "@/core/entities/job";

// Jobs
import { Scheduler } from "@/core/jobs/scheduler";

interface AssociateJourneyRequest {
  journey_id: string;
  user_id: string;
  start_at: Date;
}

export class AssociateJourney {
  constructor(
    private journeyRepository: JourneyRepository,
    private userRepository: UserRepository,
    private userJourneyRepository: UserJourneyRepository,
    private scheduler: Scheduler
  ) {}

  async execute({ journey_id, user_id, start_at }: AssociateJourneyRequest) {
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
      start_at,
    });

    await this.userJourneyRepository.create(userJourney);

    const job = Job.create({
      name: "dispatch-journey",
      params: { user_journey_id: userJourney.id.value },
      run_at: start_at,
    });

    await this.scheduler.schedule(job);
  }
}
