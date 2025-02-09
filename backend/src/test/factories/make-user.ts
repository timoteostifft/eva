// Entities
import { UUID } from "@/core/entities/uuid";
import { User, UserProps } from "@/core/entities/user";

// Libraries
import { faker } from "@faker-js/faker";

export function makeUser(props: Partial<UserProps> = {}) {
  return User.create({
    id: props.id ?? new UUID(),
    first_name: props.first_name ?? faker.person.firstName(),
    last_name: props.last_name ?? faker.person.lastName(),
    email: props.email ?? faker.internet.email(),
    phone: props.phone ?? faker.phone.number(),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? null,
  });
}
