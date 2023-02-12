import Joi from "joi";

const showGameSchema = Joi.object({
  order: Joi.string(),
  desc: Joi.boolean(),
  name: Joi.string(),
});

export default showGameSchema;
