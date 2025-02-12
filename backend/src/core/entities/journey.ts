// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";

// Types
import { Optional } from "@/core/types/optional";

export interface JourneyProps extends EntityRequest {
  name: string;
  description: string;
  interval: number;
}

export class Journey extends Entity<JourneyProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get interval() {
    return this.props.interval;
  }

  static create(props: Optional<JourneyProps, "interval">) {
    const DAY_IN_MS = 24 * 60 * 60 * 1000;

    return new Journey({
      ...props,
      interval: props.interval ?? DAY_IN_MS,
    });
  }
}
