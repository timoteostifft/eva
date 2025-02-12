// Libraries
import * as Joi from "types-joi";
import { InterfaceFrom } from "types-joi";

const schema = Joi.object({
  // Database
  DATABASE_URL: Joi.string().required(),

  // Tasks
  TASKS_QUEUE_URL: Joi.string().required(),
})
  .unknown(true)
  .required();

const { error, value } = schema.validate(process.env);

if (error) {
  const path = error.details[0].path;

  console.log(`Variável ambiente ${path} não encontrada`);
  process.exit(1);
}

export const env = value as InterfaceFrom<typeof schema>;
