// Entities
import { Message } from "@/core/entities/message";

export interface Mailer {
  send(message: Message): Promise<void>;
}
