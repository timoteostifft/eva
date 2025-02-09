// Entities
import { UUID } from "@/core/entities/uuid";
import { Journey, JourneyProps } from "@/core/entities/journey";

// Libraries
import { faker } from "@faker-js/faker";

export function makeJourney(props: Partial<JourneyProps> = {}) {
  return Journey.create({
    id: props.id ?? new UUID(),
    name: props.name ?? faker.lorem.words(3),
    description: props.description ?? faker.lorem.sentence(),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? new Date(),
  });
}
