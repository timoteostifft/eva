import "dotenv/config";

// Database
import { mongo } from "@/infra/database/mongo-service";

// Models
import { UserModel, JourneyModel } from "@/infra/database/schema";

// Factories
import { makeUser } from "@/test/factories/make-user";
import { makeJourney } from "@/test/factories/make-journey";

// Mappers
import { MongoUserMapper } from "@/infra/database/mappers/mongo-user-mapper";
import { MongoJourneyMapper } from "@/infra/database/mappers/mongo-journey-mapper";

async function seed() {
  for (let i = 0; i < 10; i++) {
    await UserModel.create(MongoUserMapper.toMongo(makeUser()));
  }

  for (let i = 0; i < 10; i++) {
    await JourneyModel.create(MongoJourneyMapper.toMongo(makeJourney()));
  }

  await mongo.disconnect();

  console.log("🌱 Os dados foram inseridos com sucesso");
}

seed();
