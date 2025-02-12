import { Entity, EntityRequest } from "@/core/entities/entity";
import { UUID } from "./uuid";

export interface TemplateProps extends EntityRequest {
  action_id: UUID;
  title: string;
  content: string;
}

export class Template extends Entity<TemplateProps> {
  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }
}
