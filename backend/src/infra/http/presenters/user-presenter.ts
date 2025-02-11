// Entities
import { User, UserProps } from "@/core/entities/user";

// Types
import { View } from "@/infra/types/view";

export class UserPresenter {
  static toHttp(user?: User): View<UserProps> {
    if (user)
      return {
        id: user.id.value,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
  }
}
