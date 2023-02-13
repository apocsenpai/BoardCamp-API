import sanitizeObject from "../utils/functions/sanitizeObject.js";
import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";
import baseQuerys from "../utils/constants/baseQuerys.js";
import {
  handleCustomersWhereParams,
  handleGamesWhereParams,
  handleRentalsWhereParams,
} from "../utils/functions/whereParamsBuilders.js";

export function validateSchema(schema) {
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
}

export function isDataAlreadyExist(table, key) {
  return async (req, res, next) => {
    const data = res.sanitizedParams[key];

    try {
      const { rowCount } = await db.query(
        `SELECT * FROM ${table} WHERE ${key} = $1`,
        [data]
      );

      if (rowCount)
        return res.status(409).send({
          message: `${key[0].toUpperCase() + key.substr(1)} já cadastrado!`,
        });

      next();
    } catch (error) {
      internalServerError(res, error);
    }
  };
}

export function checkIdIsRegisteredInThatTable(table, key) {
  return async (req, res, next) => {
    const id = res.sanitizedParams[key];

    try {
      const { rowCount, rows: result } = await db.query(
        `SELECT * FROM ${table} WHERE id = $1`,
        [id]
      );

      if (!rowCount)
        return table === "rentals" ? res.sendStatus(404) : res.sendStatus(400);

      if (table === "games") {
        res.locals = {
          pricePerDay: result[0].pricePerDay,
          stockTotal: result[0].stockTotal,
        };
      }

      next();
    } catch (error) {
      internalServerError(res, error);
    }
  };
}

export function buildListQuery(queryKey) {
  return (req, res, next) => {
    const queryParams = res.sanitizedParams;
    const baseQuery = baseQuerys[queryKey];

    if (!Object.keys(queryParams).length) {
      res.locals.query = baseQuery;
      return next();
    }

    const order = queryParams.order ? `ORDER BY "${queryParams.order}"` : "";
    const desc = order && queryParams.desc ? `DESC` : "";
    const limit = queryParams.limit ? `LIMIT ${queryParams.limit}` : "";
    const offset = queryParams.offset ? `OFFSET ${queryParams.offset}` : "";

    const whereParams = [];

    if (queryKey === "listRentals")
      whereParams.push(...handleRentalsWhereParams(queryParams));

    if (queryKey === "listGames")
      whereParams.push(...handleGamesWhereParams(queryParams));

    if (queryKey === "listCustomers")
      whereParams.push(...handleCustomersWhereParams(queryParams));

    const whereQuery = whereParams.length
      ? `WHERE ${whereParams.join(" AND ")}`
      : "";

    res.locals.query = `${baseQuery} ${whereQuery} ${order} ${desc} ${limit} ${offset}`;

    next();
  };
}
