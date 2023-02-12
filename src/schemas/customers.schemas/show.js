import Joi from "joi";

const showCostumerSchema = Joi.object({
  order: Joi.string(),
  desc: Joi.boolean(),
  cpf: Joi.number().min(0),
  offset: Joi.number().min(0),
  limit: Joi.number().min(1)
});

export default showCostumerSchema;
