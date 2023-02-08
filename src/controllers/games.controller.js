import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";

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

async function selectAll(req, res) {
  try {
    const { rows: games } = await db.query("SELECT * FROM games");

    res.send(games);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, selectAll };
