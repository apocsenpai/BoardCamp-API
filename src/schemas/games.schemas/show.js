import Joi from "joi";

const showGameSchema = Joi.object({
  order: Joi.string(),
  desc: Joi.boolean(),
  name: Joi.string(),
  offset: Joi.number().min(0),
  limit: Joi.number().min(1),
});

export default showGameSchema;
