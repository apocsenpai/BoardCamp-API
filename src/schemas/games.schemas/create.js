import Joi from "joi";
import handleJoiMessage from "../../utils/functions/handleJoiMessage.js";

const createGameSchema = Joi.object({
    name: Joi.string().messages(handleJoiMessage('name')).required(),
    image: Joi.string().uri().messages(handleJoiMessage('image')).required(),
    stockTotal: Joi.number().min(1).messages(handleJoiMessage('stockTotal')).required(),
    pricePerDay: Joi.number().min(1).messages(handleJoiMessage('pricePerDay')).required(),
});

export default createGameSchema;