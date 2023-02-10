import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";

export async function checkGameIsAvailable(req, res, next) {
  const gameId = Number(res.sanitizedParams.gameId);
  const { stockTotal } = res.locals;

  try {
    const { rowCount } = await db.query(
      `SELECT rentals.id FROM games
      JOIN rentals ON games.id = $1
      WHERE rentals."gameId" = $1 AND rentals."returnDate" IS NULL`,
      [gameId]
    );
      console.log(gameId, rowCount)
    if (rowCount === stockTotal) return res.sendStatus(400);

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}
