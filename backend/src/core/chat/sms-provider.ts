import { Message } from "@/core/entities/message";

export interface SmsProvider {
  send(message: Message): Promise<void>;
}
