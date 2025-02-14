import { DispatchJourney } from "./dispatch-journey";

// Repositories
import { InMemoryUserJourneyRepository } from "@/test/repositories/in-memory-user-journey-repository";
import { InMemoryJourneyRepository } from "@/test/repositories/in-memory-journey-repository";
import { InMemoryActionRepository } from "@/test/repositories/in-memory-action-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";
import { InMemoryTemplateRepository } from "@/test/repositories/in-memory-template-repository";

// Jobs
import { MockedScheduler } from "@/test/jobs/mocked-scheduler";

// Mail
import { MockedMailer } from "@/test/mail/mocked-mailer";

// Chat
import { MockedMessageProvider } from "@/test/chat/mocked-message-provider";
import { MockedSmsProvider } from "@/test/chat/mocked-sms-provider";

// Factories
import { makeUser } from "@/test/factories/make-user";
import { makeJourney } from "@/test/factories/make-journey";
import { makeAction } from "@/test/factories/make-action";
import { makeTemplate } from "@/test/factories/make-template";
import { makeUserJourney } from "@/test/factories/make-user-journey";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

let sut: DispatchJourney;

let userJourneyRepository: InMemoryUserJourneyRepository;
let journeyRepository: InMemoryJourneyRepository;
let actionRepository: InMemoryActionRepository;
let userRepository: InMemoryUserRepository;
let scheduler: MockedScheduler;
let mailer: MockedMailer;
let messageProvider: MockedMessageProvider;
let smsProvider: MockedSmsProvider;
let templateRepository: InMemoryTemplateRepository;

describe("Dispatch Journey", () => {
  beforeEach(() => {
    userJourneyRepository = new InMemoryUserJourneyRepository();
    journeyRepository = new InMemoryJourneyRepository();
    actionRepository = new InMemoryActionRepository();
    userRepository = new InMemoryUserRepository();
    templateRepository = new InMemoryTemplateRepository();
    scheduler = new MockedScheduler();
    mailer = new MockedMailer();
    messageProvider = new MockedMessageProvider();
    smsProvider = new MockedSmsProvider();

    sut = new DispatchJourney(
      userJourneyRepository,
      journeyRepository,
      actionRepository,
      userRepository,
      templateRepository,
      scheduler,
      mailer,
      messageProvider,
      smsProvider
    );
  });

  it("should dispatch a journey", () => {
    userJourneyRepository = new InMemoryUserJourneyRepository();
    journeyRepository = new InMemoryJourneyRepository();
    actionRepository = new InMemoryActionRepository();
    userRepository = new InMemoryUserRepository();
    templateRepository = new InMemoryTemplateRepository();
    scheduler = new MockedScheduler();
    mailer = new MockedMailer();
    messageProvider = new MockedMessageProvider();
    smsProvider = new MockedSmsProvider();

    sut = new DispatchJourney(
      userJourneyRepository,
      journeyRepository,
      actionRepository,
      userRepository,
      templateRepository,
      scheduler,
      mailer,
      messageProvider,
      smsProvider
    );
  });

  it("should dispatch a journey", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const journey = makeJourney();
    await journeyRepository.create(journey);

    const action = makeAction({
      journey_id: journey.id,
      stage: 1,
      type: "email",
    });
    await actionRepository.create(action);

    const template = makeTemplate({
      action_id: action.id,
      title: "Bem vindo, {{name}}",
      content: "Olá, {{name}}! Seja bem vindo ao nosso site.",
    });
    await templateRepository.create(template);

    const userJourney = makeUserJourney({
      user_id: user.id,
      journey_id: journey.id,
      stage: 1,
    });
    await userJourneyRepository.create(userJourney);

    await sut.execute({
      user_journey_id: userJourney.id.value,
    });

    expect(mailer.messages).toHaveLength(1);
    expect(mailer.messages[0].subject).toBe(`Bem vindo, ${user.name}`);
    expect(userJourneyRepository.userJourneys[0].status).toBe("completed");
    expect(userJourneyRepository.userJourneys[0].stage).toBe(1);
  });

  it("should automatically schedule the next action", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const journey = makeJourney();
    await journeyRepository.create(journey);

    const action = makeAction({
      journey_id: journey.id,
      stage: 1,
      type: "email",
    });
    await actionRepository.create(action);

    const nextAction = makeAction({
      journey_id: journey.id,
      stage: 2,
      type: "sms",
    });
    await actionRepository.create(nextAction);

    const template = makeTemplate({
      action_id: action.id,
      title: "Bem vindo, {{name}}",
      content: "Olá, {{name}}! Seja bem vindo ao nosso site.",
    });
    await templateRepository.create(template);

    const userJourney = makeUserJourney({
      user_id: user.id,
      journey_id: journey.id,
      stage: 1,
    });
    await userJourneyRepository.create(userJourney);

    await sut.execute({
      user_journey_id: userJourney.id.value,
    });

    expect(scheduler.jobs).toHaveLength(1);
    expect(scheduler.jobs[0].name).toBe("dispatch-journey");
    expect(scheduler.jobs[0].params).toEqual({
      user_journey_id: userJourney.id.value,
    });
  });

  it("should throw when user journey is not found", async () => {
    await expect(() =>
      sut.execute({
        user_journey_id: "non-existent-id",
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should not dispatch journey when journey is not found", async () => {
    const userJourney = makeUserJourney();
    await userJourneyRepository.create(userJourney);

    await expect(() =>
      sut.execute({
        user_journey_id: userJourney.id.value,
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should not dispatch journey when action is not found", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const journey = makeJourney();
    await journeyRepository.create(journey);

    const userJourney = makeUserJourney({
      user_id: user.id,
      journey_id: journey.id,
      stage: 1,
    });
    await userJourneyRepository.create(userJourney);

    await expect(() =>
      sut.execute({
        user_journey_id: userJourney.id.value,
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should not dispatch journey when user is not found", async () => {
    const journey = makeJourney();
    await journeyRepository.create(journey);

    const action = makeAction({
      journey_id: journey.id,
      stage: 1,
    });
    await actionRepository.create(action);

    const userJourney = makeUserJourney({
      journey_id: journey.id,
      stage: 1,
    });
    await userJourneyRepository.create(userJourney);

    await expect(() =>
      sut.execute({
        user_journey_id: userJourney.id.value,
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should throw when template is not found", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const journey = makeJourney();
    await journeyRepository.create(journey);

    const action = makeAction({
      journey_id: journey.id,
      stage: 1,
    });
    await actionRepository.create(action);

    const userJourney = makeUserJourney({
      user_id: user.id,
      journey_id: journey.id,
      stage: 1,
    });
    await userJourneyRepository.create(userJourney);

    await expect(() =>
      sut.execute({
        user_journey_id: userJourney.id.value,
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
