// Entities
import { Action } from "@/core/entities/action";

export interface ActionsRepositorySearchRequest {
  journey_id?: string;
  priority?: number;
}

export interface ActionsRepository {
  find(filters: ActionsRepositorySearchRequest): Promise<Action | null>;
  update(action: Action): Promise<void>;
}
