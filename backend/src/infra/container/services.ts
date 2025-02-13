import { AwilixContainer, asClass } from "awilix";

// Services
import { BullScheduler } from "@/infra/jobs/bull-scheduler";
import { MockedMailer } from "@/test/mail/mocked-mailer";
import { MockedSmsProvider } from "@/test/chat/mocked-sms-provider";
import { MockedMessageProvider } from "@/test/chat/mocked-message-provider";

export function registerServices(container: AwilixContainer) {
  container.register({
    scheduler: asClass(BullScheduler).singleton(),
    mailer: asClass(MockedMailer).singleton(),
    smsProvider: asClass(MockedSmsProvider).singleton(),
    messageProvider: asClass(MockedMessageProvider).singleton(),
  });
}
