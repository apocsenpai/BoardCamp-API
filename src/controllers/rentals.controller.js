import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";
import dayjs from "dayjs";

async function create(req, res) {
  const { customerId, gameId, daysRented } = res.sanitizedParams;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const originalPrice = res.locals.pricePerDay * daysRented;

  try {
    await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee" ) VALUES ($1, $2, $3, $4, $5, null, null)`,
      [customerId, gameId, rentDate, daysRented, originalPrice]
    );

    res.sendStatus(201);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create };
