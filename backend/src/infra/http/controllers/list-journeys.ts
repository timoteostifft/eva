// Libraries
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Container
import { container } from "@/infra/container";

// Presenters
import { JourneyPresenter } from "@/infra/http/presenters/journey-presenter";

// Use Cases
import { ListJourneys } from "@/core/use-cases/list-journeys";

export const listJourneysSchema = Joi.object({
  name: Joi.string().optional(),
  page: Joi.number().integer().min(1).required(),
});

export async function listJourneys(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { error, value } = listJourneysSchema.validate(request.query);

    if (error) throw error;

    const listJourneys = container.resolve<ListJourneys>("listJourneys");

    const journeys = await listJourneys.execute(value);

    return response.status(200).send(journeys.map(JourneyPresenter.toHttp));
  } catch (error) {
    next(error);
  }
}
