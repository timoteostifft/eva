// Entities
import { UserJourney, UserJourneyProps } from "@/core/entities/user-journey";
import { UUID } from "@/core/entities/uuid";

// Libraries
import { faker } from "@faker-js/faker";

export function makeUserJourney(props: Partial<UserJourneyProps> = {}) {
  return UserJourney.create({
    id: props.id ?? new UUID(),
    user_id: props.user_id ?? new UUID(),
    journey_id: props.journey_id ?? new UUID(),
    start_at: props.start_at ?? new Date(),
    stage: props.stage ?? faker.number.int({ min: 1, max: 10 }),
    status: props.status ?? "pending",
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? null,
  });
}
