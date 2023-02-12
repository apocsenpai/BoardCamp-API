import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";

export async function verifyCpfOwner(req, res, next) {
  const requestId = Number(res.sanitizedParams.id);
  const { cpf } = res.sanitizedParams;

  try {
    const { rowCount, rows: result } = await db.query(
      "SELECT * FROM customers WHERE cpf = $1 OR id = $2",
      [cpf, requestId]
    );

    if (!rowCount) return res.sendStatus(404);

    if (rowCount === 2) return res.sendStatus(409);

    if (result[0].id !== requestId) return res.sendStatus(404);

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}
export function buildListCustomersQuery(req, res, next) {
  const queryParams = res.sanitizedParams;
  const mainQuery = `SELECT * FROM customers`;

  if (!Object.keys(queryParams).length) {
    res.locals.query = mainQuery;
    return next();
  }

  const whereParams = [];
  let order = "";
  let paginationParams = [];

  Object.keys(queryParams).forEach((key) => {
    if (key === "order")
      order = queryParams["desc"]
        ? `ORDER BY ${queryParams[key]} DESC`
        : `ORDER BY ${queryParams[key]}`;

    if (key === "cpf") whereParams.push(`${key} ILIKE '${queryParams[key]}%'`);

    if (key === "limit") paginationParams.push(`LIMIT ${queryParams[key]}`);

    if (key === "offset") paginationParams.push(`OFFSET ${queryParams[key]}`);
  });

  const whereQuery = whereParams.length
    ? `WHERE ${whereParams.join(" AND ")}`
    : "";

  const paginationQuery = paginationParams.join(" ");

  res.locals.query = `${mainQuery} ${whereQuery} ${order} ${paginationQuery}`;

  next();
}
