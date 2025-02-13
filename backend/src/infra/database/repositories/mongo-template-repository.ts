import { Template } from "@/core/entities/template";
import {
  TemplateRepository,
  TemplateRepositorySearchRequest,
} from "@/core/repositories/template-repository";

// Database
import { TemplateModel } from "@/infra/database/schema";

// Mappers
import { MongoTemplateMapper } from "@/infra/database/mappers/mongo-template-mapper";

export class MongoTemplateRepository implements TemplateRepository {
  async find({
    action_id,
  }: TemplateRepositorySearchRequest): Promise<Template | null> {
    const data = await TemplateModel.findOne({
      ...(action_id && { action_id }),
    });

    if (!data) {
      return null;
    }

    return MongoTemplateMapper.toDomain(data);
  }

  async create(template: Template): Promise<void> {
    const data = MongoTemplateMapper.toMongo(template);
    await TemplateModel.create(data);
  }
}
