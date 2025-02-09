// Libraries
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// Errors
import { BaseError } from "@/core/errors/base-error";

// Errors Mapper
import { mapper } from "@/infra/http/errors/mapper";

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

  if (error instanceof BaseError && error.code in mapper) {
    return response.status(mapper[error.code]).send({
      message: error.message,
      code: error.code,
    });
  }

  return response
    .status(500)
    .send({ message: "💥 Ocorreu um erro interno", code: "internal-error" });
}
