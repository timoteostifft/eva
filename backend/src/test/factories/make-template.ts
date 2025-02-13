// Entities
import { Template, TemplateProps } from "@/core/entities/template";
import { UUID } from "@/core/entities/uuid";

// Libraries
import { faker } from "@faker-js/faker";

export function makeTemplate(props: Partial<TemplateProps> = {}) {
  return Template.create({
    id: props.id ?? new UUID(),
    action_id: props.action_id ?? new UUID(),
    title: props.title ?? faker.lorem.sentence(),
    content: props.content ?? faker.lorem.paragraph(),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? null,
  });
}
