// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";

export interface UserProps extends EntityRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get name() {
    return `${this.props.first_name} ${this.props.last_name}`;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  static create(props: UserProps) {
    return new User(props);
  }
}
