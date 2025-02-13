// Entities
import { Template } from "@/core/entities/template";
import { UUID } from "@/core/entities/uuid";

// Database
import { TemplateModel } from "@/infra/database/schema";

// Libraries
import { InferSchemaType } from "mongoose";

type MongoTemplate = InferSchemaType<typeof TemplateModel.schema>;

export class MongoTemplateMapper {
  static toDomain(raw: MongoTemplate): Template {
    return Template.create({
      id: new UUID(raw._id),
      action_id: new UUID(raw.action_id),
      title: raw.title,
      content: raw.content,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    });
  }

  static toMongo(template: Template): MongoTemplate {
    return {
      _id: template.id.value,
      action_id: template.action_id.value,
      title: template.title,
      content: template.content,
      created_at: template.created_at,
      updated_at: template.updated_at,
    };
  }
}
