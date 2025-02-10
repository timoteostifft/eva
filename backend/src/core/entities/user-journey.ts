// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";
import { UUID } from "@/core/entities/uuid";

// Types
import { Optional } from "@/core/types/optional";

export type UserJourneyStatus = (typeof UserJourney.statuses)[number];

export interface UserJourneyProps extends EntityRequest {
  user_id: UUID;
  journey_id: UUID;
  start: Date;
  status: UserJourneyStatus;
}

export class UserJourney extends Entity<UserJourneyProps> {
  constructor(props: UserJourneyProps) {
    super(props);
  }

  get user_id() {
    return this.props.user_id;
  }

  get journey_id() {
    return this.props.journey_id;
  }

  get status() {
    return this.props.status;
  }

  get start() {
    return this.props.start;
  }

  static create(props: Optional<UserJourneyProps, "status">) {
    return new UserJourney({
      ...props,
      status: props.status ?? "pending",
    });
  }

  static readonly statuses = ["pending", "completed"] as const;
}
