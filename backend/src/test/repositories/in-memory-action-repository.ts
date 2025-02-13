// Entities
import { Action } from "@/core/entities/action";

// Repositories
import {
  ActionRepository,
  ActionRepositorySearchRequest,
} from "@/core/repositories/action-repository";

export class InMemoryActionRepository implements ActionRepository {
  public actions: Action[] = [];

  async find({
    journey_id,
    stage,
  }: ActionRepositorySearchRequest): Promise<Action | null> {
    const action = this.actions.find((action) =>
      Boolean(
        (!journey_id || action.journey_id.equals(journey_id)) &&
          (!stage || action.stage === stage)
      )
    );

    if (!action) {
      return null;
    }

    return action;
  }

  async create(action: Action): Promise<void> {
    this.actions.push(action);
  }
}
