// Entities
import { Template } from "@/core/entities/template";

// Repositories
import {
  TemplateRepository,
  TemplateRepositorySearchRequest,
} from "@/core/repositories/template-repository";

export class InMemoryTemplateRepository implements TemplateRepository {
  public templates: Template[] = [];

  async find({
    action_id,
  }: TemplateRepositorySearchRequest): Promise<Template | null> {
    const template = this.templates.find((template) =>
      Boolean(!action_id || template.action_id.equals(action_id))
    );

    if (!template) {
      return null;
    }

    return template;
  }

  async create(template: Template): Promise<void> {
    this.templates.push(template);
  }
}
