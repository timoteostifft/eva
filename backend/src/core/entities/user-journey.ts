// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";

// Types
import { Optional } from "@/core/types/optional";

export interface UserJourneyProps extends EntityRequest {
  user_id: string;
  journey_id: string;
  start: Date;
  status: "pending" | "completed";
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

  static create(props: Optional<UserJourneyProps, "status">) {
    return new UserJourney({
      ...props,
      status: props.status ?? "pending",
    });
  }
}
