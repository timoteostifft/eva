// Entities
import { Message } from "@/core/entities/message";

export interface MessageProvider {
  send(message: Message): Promise<void>;
}
