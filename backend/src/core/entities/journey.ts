// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";

export interface JourneyProps extends EntityRequest {
  name: string;
  description: string;
}

export class Journey extends Entity<JourneyProps> {
  constructor(props: JourneyProps) {
    super(props);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  static create(props: JourneyProps) {
    return new Journey(props);
  }
}
