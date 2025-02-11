// Libraries
import Joi from "joi";
import { NextFunction, Request, Response } from "express";

// Use Cases
import { ListUsers } from "@/core/use-cases/list-users";

// Container
import { container } from "@/infra/container";

// Presenters
import { UserPresenter } from "@/infra/http/presenters/user-presenter";

export const listUsersSchema = Joi.object({
  name: Joi.string().optional(),
  page: Joi.number().integer().min(1).required(),
});

export async function listUsers(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { error, value } = listUsersSchema.validate(request.query);

    if (error) throw error;

    const listUsers = container.resolve<ListUsers>("listUsers");

    const users = await listUsers.execute(value);

    return response.status(200).send(users.map(UserPresenter.toHttp));
  } catch (error) {
    next(error);
  }
}
