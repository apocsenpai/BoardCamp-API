import Joi from "joi";
import handleJoiMessage from "../utils/functions/handleJoiMessage.js";
import { onlyNumbers } from "../utils/constants/regex.js";

const idSchema = Joi.object({
  id: Joi.string()
    .regex(onlyNumbers)
    .messages(handleJoiMessage("id"))
    .required(),
});

export default idSchema;