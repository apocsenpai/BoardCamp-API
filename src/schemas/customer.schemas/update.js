import Joi from "joi";
import handleJoiMessage from "../../utils/functions/handleJoiMessage.js";
import {
  onlyLetterAndSpaces,
  onlyNumbers,
} from "../../utils/constants/regex.js";

const updateCustomerSchema = Joi.object({
  id: Joi.string()
    .regex(onlyNumbers)
    .messages(handleJoiMessage("id"))
    .required(),
  name: Joi.string()
    .regex(onlyLetterAndSpaces)
    .messages(handleJoiMessage("name"))
    .required(),
  phone: Joi.string()
    .min(10)
    .max(11)
    .regex(onlyNumbers)
    .messages(handleJoiMessage("phone"))
    .required(),
  cpf: Joi.string()
    .length(11)
    .regex(onlyNumbers)
    .messages(handleJoiMessage("cpf"))
    .required(),
  birthday: Joi.date().messages(handleJoiMessage("birthday")).required(),
});

export default updateCustomerSchema;
