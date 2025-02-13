// Entities
import { Message } from "@/core/entities/message";

// Services
import { SmsProvider } from "@/core/chat/sms-provider";

export class MockedSmsProvider implements SmsProvider {
  public messages: Message[] = [];

  async send(message: Message): Promise<void> {
    this.messages.push(message);
  }
}
