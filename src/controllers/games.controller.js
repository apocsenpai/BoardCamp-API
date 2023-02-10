import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";
import { buildOrderQuery } from "../utils/functions/queryBuilders.js";

async function create(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.sanitizedParams;

  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES
      ($1, $2, $3, $4)`,
      [name, image, stockTotal, pricePerDay]
    );

    res.sendStatus(201);
  } catch (error) {
    internalServerError(res, error);
  }
}

async function listAll(req, res) {
  const order = req.query.order;
  const desc = req.query.desc;
  const queryOrder = buildOrderQuery(order, desc);


  try {
    const { rows: games } = await db.query(`SELECT * FROM games ${queryOrder}`);

    res.send(games);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, listAll };
