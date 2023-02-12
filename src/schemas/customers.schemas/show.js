import Joi from "joi";

const showCostumerSchema = Joi.object({
  order: Joi.string(),
  desc: Joi.boolean(),
  cpf: Joi.number().min(0)
});

export default showCostumerSchema;
