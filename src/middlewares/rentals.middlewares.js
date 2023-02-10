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

    if (rowCount === stockTotal) return res.sendStatus(400);

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}

export function checkReturnDateIsNotNull(key) {
  return async (req, res, next) => {
    const id = Number(res.sanitizedParams.id);

    try {
      const { rowCount, rows: rentals } = await db.query(
        `SELECT "rentDate", "daysRented", "originalPrice" FROM rentals WHERE id = $1 AND "returnDate" IS NULL`,
        [id]
      );

      if (rowCount && key === "delete") return res.sendStatus(400);

      if (key === "rentalReturn") {
        if (!rowCount) return res.sendStatus(400);

        res.locals = {
          rentDate: rentals[0].rentDate,
          daysRented: rentals[0].daysRented,
          originalPrice: rentals[0].originalPrice,
        };
      }

      next();
    } catch (error) {
      internalServerError(res, error);
    }
  };
}
