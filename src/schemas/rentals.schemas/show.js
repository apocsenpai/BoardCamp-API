import Joi from "joi";

const showRentalSchema = Joi.object({
  order: Joi.string(),
  desc: Joi.boolean(),
  customerId: Joi.number().min(1),
  gameId: Joi.number().min(1),
});

export default showRentalSchema;
