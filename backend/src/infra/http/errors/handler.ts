// Libraries
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export async function handler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof Joi.ValidationError) {
    return response.status(400).send({
      message: "💥 Ocorreu um erro de validação",
      code: "bad-request",
      details: error.message.replace(/['"]/g, ""),
    });
  }

  return response
    .status(500)
    .send({ message: "💥 Ocorreu um erro interno", code: "internal-error" });
}
