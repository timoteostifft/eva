// Entities
import { Job } from "@/core/entities/job";
import { Message } from "@/core/entities/message";

// Repositories
import { UserJourneyRepository } from "@/core/repositories/user-journey-repository";
import { ActionRepository } from "@/core/repositories/action-repository";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

// Repositories
import { JourneyRepository } from "@/core/repositories/journey-repository";

// Jobs
import { Scheduler } from "@/core/jobs/scheduler";

// Mail
import { Mailer } from "@/core/mail/mailer";

// Repositories
import { UserRepository } from "@/core/repositories/user-repository";
import { TemplateRepository } from "@/core/repositories/template-repository";

// Chat
import { MessageProvider } from "@/core/chat/message-provider";
import { SmsProvider } from "@/core/chat/sms-provider";

// Utils
import { replace } from "@/core/utils/replace";

interface DispatchJourneyRequest {
  user_journey_id: string;
}

export class DispatchJourney {
  constructor(
    private userJourneyRepository: UserJourneyRepository,
    private journeyRepository: JourneyRepository,
    private actionRepository: ActionRepository,
    private userRepository: UserRepository,
    private templateRepository: TemplateRepository,
    private scheduler: Scheduler,
    private mailer: Mailer,
    private messageProvider: MessageProvider,
    private smsProvider: SmsProvider
  ) {}

  async execute({ user_journey_id }: DispatchJourneyRequest) {
    const userJourney = await this.userJourneyRepository.find({
      id: user_journey_id,
    });

    if (!userJourney) {
      throw new ResourceNotFoundError("Jornada de usuário", user_journey_id);
    }

    const journey = await this.journeyRepository.find({
      id: userJourney.journey_id.value,
    });

    if (!journey) {
      throw new ResourceNotFoundError("Jornada", userJourney.journey_id.value);
    }

    const action = await this.actionRepository.find({
      journey_id: journey.id.value,
      stage: userJourney.stage,
    });

    if (!action) {
      throw new ResourceNotFoundError("Ação da jornada", journey.id.value);
    }

    const user = await this.userRepository.find({
      id: userJourney.user_id.value,
    });

    if (!user) {
      throw new ResourceNotFoundError("Usuário", userJourney.user_id.value);
    }

    const template = await this.templateRepository.find({
      action_id: action.id.value,
    });

    if (!template) {
      throw new ResourceNotFoundError("Template", action.id.value);
    }

    const message = Message.create({
      subject: replace(template.title, { name: user.name }),
      content: replace(template.content, { name: user.name }),
    });

    switch (action.type) {
      case "email":
        await this.mailer.send(message);
        break;
      case "sms":
        await this.smsProvider.send(message);
        break;
      case "message":
        await this.messageProvider.send(message);
        break;
    }

    const next = await this.actionRepository.find({
      journey_id: journey.id.value,
      stage: userJourney.stage + 1,
    });

    if (!next) {
      userJourney.status = "completed";
      userJourney.touch();
      return await this.userJourneyRepository.update(userJourney);
    }

    userJourney.stage++;
    userJourney.touch();

    const job = Job.create({
      name: "dispatch-journey",
      params: { user_journey_id: userJourney.id.value },
      run_at: new Date(Date.now() + journey.interval),
    });

    await this.scheduler.schedule(job);
    await this.userJourneyRepository.update(userJourney);
  }
}
