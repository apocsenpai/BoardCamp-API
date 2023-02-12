import Joi from "joi";

const showRentalSchema = Joi.object({
  order: Joi.string(),
  desc: Joi.boolean(),
  customerId: Joi.number().min(1),
  gameId: Joi.number().min(1),
  offset: Joi.number().min(0),
  limit: Joi.number().min(1),
  status: Joi.string().valid("open", "closed"),
  startDate: Joi.date(),
});

export default showRentalSchema;
