// Entities
import { Message } from "@/core/entities/message";

// Services
import { Mailer } from "@/core/mail/mailer";

export class MockedMailer implements Mailer {
  public messages: Message[] = [];

  async send(message: Message): Promise<void> {
    this.messages.push(message);
  }
}
