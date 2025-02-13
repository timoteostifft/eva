// Entities
import { Action } from "@/core/entities/action";

export interface ActionRepositorySearchRequest {
  journey_id?: string;
  stage?: number;
}

export interface ActionRepository {
  find(filters: ActionRepositorySearchRequest): Promise<Action | null>;
  create(action: Action): Promise<void>;
}
