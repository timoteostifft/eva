// Libraries
import Joi from "joi";
import { NextFunction, Request, Response } from "express";

// Use Cases
import { AssociateJourney } from "@/core/use-cases/associate-journey";

// Container
import { container } from "@/infra/container";

export const associateJourneySchema = Joi.object({
  journey_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
  start_at: Joi.date().required(),
});

export async function associateJourney(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { error, value } = associateJourneySchema.validate(request.body);

    if (error) throw error;

    const associateJourney =
      container.resolve<AssociateJourney>("associateJourney");

    await associateJourney.execute(value);

    return response.status(201).send();
  } catch (error) {
    next(error);
  }
}
