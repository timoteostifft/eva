// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";

export interface MessageProps extends EntityRequest {
  subject: string;
  content: string;
}

export class Message extends Entity<MessageProps> {
  get subject() {
    return this.props.subject;
  }

  get content() {
    return this.props.content;
  }

  static create(props: MessageProps) {
    return new Message(props);
  }
}
