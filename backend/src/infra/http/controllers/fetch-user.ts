// Libraries
import { Request, Response, NextFunction } from "express";

// Container
import { container } from "@/infra/container";

// Use Cases
import { FetchUser } from "@/core/use-cases/fetch-user";

// Presenters
import { UserPresenter } from "@/infra/http/presenters/user-presenter";

export async function fetchUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;

    const fetchUser = container.resolve<FetchUser>("fetchUser");

    const user = await fetchUser.execute({ id });

    return response.status(200).send(UserPresenter.toHttp(user));
  } catch (error) {
    next(error);
  }
}
