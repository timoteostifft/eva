// Entities
import { Action, ActionProps } from "@/core/entities/action";
import { UUID } from "@/core/entities/uuid";

// Libraries
import { faker } from "@faker-js/faker";

export function makeAction(props: Partial<ActionProps> = {}) {
  return Action.create({
    id: props.id ?? new UUID(),
    journey_id: props.journey_id ?? new UUID(),
    type: props.type ?? "email",
    stage: props.stage ?? faker.number.int({ min: 1, max: 10 }),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? null,
  });
}
