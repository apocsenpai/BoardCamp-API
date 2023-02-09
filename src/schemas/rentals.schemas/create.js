import Joi from "joi";
import handleJoiMessage from "../../utils/functions/handleJoiMessage.js";

const createRentalSchema = Joi.object({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.number().min(1).messages(handleJoiMessage('daysRented')).required(),
});

export default createRentalSchema;
