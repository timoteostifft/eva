// Types
import { View } from "@/infra/types/view";

// Entities
import { Journey, JourneyProps } from "@/core/entities/journey";

export class JourneyPresenter {
  static toHttp(journey?: Journey): View<JourneyProps> {
    if (journey)
      return {
        id: journey.id.value,
        name: journey.name,
        description: journey.description,
        interval: journey.interval,
        created_at: journey.created_at,
        updated_at: journey.updated_at,
      };
  }
}
