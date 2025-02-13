import "dotenv/config";

// Database
import { mongo } from "@/infra/database/mongo-service";

// Models
import {
  UserModel,
  JourneyModel,
  ActionModel,
  TemplateModel,
} from "@/infra/database/schema";

// Factories
import { makeUser } from "@/test/factories/make-user";
import { makeJourney } from "@/test/factories/make-journey";
import { makeAction } from "@/test/factories/make-action";
import { makeTemplate } from "@/test/factories/make-template";

// Mappers
import { MongoUserMapper } from "@/infra/database/mappers/mongo-user-mapper";
import { MongoJourneyMapper } from "@/infra/database/mappers/mongo-journey-mapper";
import { MongoActionMapper } from "@/infra/database/mappers/mongo-action-mapper";
import { MongoTemplateMapper } from "@/infra/database/mappers/mongo-template-mapper";

const TEMPLATE_CONTENT =
  "Bem vindo, {{name}}, esperamos que você tenha uma ótima jornada com a gente.";

async function seed() {
  for (let i = 0; i < 10; i++) {
    await UserModel.create(MongoUserMapper.toMongo(makeUser()));
  }

  for (let i = 0; i < 10; i++) {
    const journey = makeJourney();
    await JourneyModel.create(MongoJourneyMapper.toMongo(journey));

    const action = makeAction({
      journey_id: journey.id,
      stage: 1,
      type: "email",
    });
    await ActionModel.create(MongoActionMapper.toMongo(action));

    const random = Math.floor(Math.random() * 10);

    if (random % 2 === 0) {
      const next = makeAction({
        journey_id: journey.id,
        stage: 2,
        type: "email",
      });
      await ActionModel.create(MongoActionMapper.toMongo(next));
    }

    const template = makeTemplate({
      action_id: action.id,
      title: "Bem vindo, {{name}}",
      content: TEMPLATE_CONTENT,
    });
    await TemplateModel.create(MongoTemplateMapper.toMongo(template));
  }

  await mongo.disconnect();

  console.log("🌱 Os dados foram inseridos com sucesso");
}

seed();
