// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";
import { UUID } from "@/core/entities/uuid";

// Types
import { Optional } from "@/core/types/optional";

export type UserJourneyStatus = (typeof UserJourney.statuses)[number];

export interface UserJourneyProps extends EntityRequest {
  user_id: UUID;
  journey_id: UUID;
  stage: number;
  start_at: Date;
  status: UserJourneyStatus;
}

export class UserJourney extends Entity<UserJourneyProps> {
  get user_id() {
    return this.props.user_id;
  }

  get journey_id() {
    return this.props.journey_id;
  }

  get stage() {
    return this.props.stage;
  }

  set stage(stage: number) {
    this.props.stage = stage;
  }

  get status() {
    return this.props.status;
  }

  set status(status: UserJourneyStatus) {
    this.props.status = status;
  }

  get start_at() {
    return this.props.start_at;
  }

  static create(props: Optional<UserJourneyProps, "status" | "stage">) {
    return new UserJourney({
      ...props,
      status: props.status ?? "pending",
      stage: props.stage ?? 1,
    });
  }

  static readonly statuses = ["pending", "completed"] as const;
}
