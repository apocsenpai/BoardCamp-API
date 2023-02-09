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

    if(result[0].id!==requestId) return res.sendStatus(404);

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}
