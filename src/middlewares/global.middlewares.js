import sanitizeObject from "../utils/functions/sanitizeObject.js";
import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";

export const validateSchema = (schema) => {
  return (req, res, next) => {
    res.sanitizedParams = sanitizeObject({
      ...req.body,
      ...req.query,
      ...req.params,
    });
    const { error } = schema.validate(res.sanitizedParams, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      return res.status(400).send(errorMessages);
    }

    next();
  };
};

export const isDataAlreadyExist = (table, key) => {
  return async (req, res, next) => {
    const data = res.sanitizedParams[key];

    try {
      const { rowCount } = await db.query(
        `SELECT * FROM ${table} WHERE ${key} = $1`,
        [data]
      );

      if (rowCount)
        return res
          .status(409)
          .send({ message: `${key[0].toUpperCase()+key.substr(1)} já cadastrado!` });

      next();
    } catch (error) {
      internalServerError(res, error);
    }
  };
};
