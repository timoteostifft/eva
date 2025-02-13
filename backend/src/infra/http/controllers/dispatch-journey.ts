// Libraries
import Joi from "joi";
import { NextFunction, Request, Response } from "express";

// Container
import { container } from "@/infra/container";

// Use Cases
import { DispatchJourney } from "@/core/use-cases/dispatch-journey";

export const dispatchJourneySchema = Joi.object({
  user_journey_id: Joi.string().uuid().required(),
});

export async function dispatchJourney(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { error, value } = dispatchJourneySchema.validate(request.body);

    if (error) throw error;

    const dispatchJourney =
      container.resolve<DispatchJourney>("dispatchJourney");

    await dispatchJourney.execute(value);

    return response.status(201).send();
  } catch (error) {
    next(error);
  }
}
