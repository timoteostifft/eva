// Entities
import { UUID } from "@/core/entities/uuid";

// Types
import { Optional } from "@/core/types/optional";

export interface EntityRequest
  extends Optional<EntityProps, "id" | "created_at" | "updated_at"> {}

export interface EntityProps {
  id: UUID;
  created_at: Date;
  updated_at: Date | null;
}

export abstract class Entity<Props> {
  private _props: Props & EntityProps;

  get id() {
    return this.props.id;
  }

  get props(): Props & EntityProps {
    return this._props;
  }

  get created_at() {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  set updated_at(value: Date | null) {
    this.props.updated_at = value;
  }

  touch() {
    this.props.updated_at = new Date();
  }

  protected constructor(
    props: Props & Optional<EntityProps, "id" | "created_at" | "updated_at">
  ) {
    this._props = {
      ...props,
      id: props.id ?? new UUID(),
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? null,
    };
  }
}
