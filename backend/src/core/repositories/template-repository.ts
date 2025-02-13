// Entities
import { Template } from "@/core/entities/template";

export interface TemplateRepositorySearchRequest {
  action_id?: string;
}

export interface TemplateRepository {
  find(props: TemplateRepositorySearchRequest): Promise<Template | null>;
  create(template: Template): Promise<void>;
}
