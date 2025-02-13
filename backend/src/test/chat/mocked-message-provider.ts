// Entities
import { Message } from "@/core/entities/message";

// Services
import { MessageProvider } from "@/core/chat/message-provider";

export class MockedMessageProvider implements MessageProvider {
  public messages: Message[] = [];

  async send(message: Message): Promise<void> {
    this.messages.push(message);
  }
}
