// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";

// Entities
import { UUID } from "@/core/entities/uuid";

export type ActionType = (typeof Action.types)[number];

export interface ActionProps extends EntityRequest {
  journey_id: UUID;
  type: ActionType;
  priority: number;
}

export class Action extends Entity<ActionProps> {
  get type() {
    return this.props.type;
  }

  get priority() {
    return this.props.priority;
  }

  static create(props: ActionProps) {
    return new Action(props);
  }

  static readonly types = ["email", "sms", "message"] as const;
}
