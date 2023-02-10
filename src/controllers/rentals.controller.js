import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";
import dayjs from "dayjs";
import calculateDelayFee from "../utils/functions/calculateDelayFee.js";
import { buildOrderQuery } from "../utils/functions/queryBuilders.js";

async function create(req, res) {
  const { customerId, gameId, daysRented } = res.sanitizedParams;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const originalPrice = res.locals.pricePerDay * daysRented;

  try {
    await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee" )
      VALUES ($1, $2, $3, $4, $5, null, null)`,
      [customerId, gameId, rentDate, daysRented, originalPrice]
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
    const { rows: resultRentals } = await db.query(
      `SELECT rentals.*, customers.name AS customer_name, games.name AS game_name FROM rentals
      INNER JOIN games ON rentals."gameId" = games.id
      INNER JOIN customers ON rentals."customerId" = customers.id ${queryOrder}`
    );

    const rentals = resultRentals.map(
      ({
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer_name,
        game_name,
      }) => {
        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: { id: customerId, name: customer_name },
          game: { id: gameId, name: game_name },
        };
      }
    );

    res.send(rentals);
  } catch (error) {
    internalServerError(res, error);
  }
}

async function deleteById(req, res) {
  const id = Number(res.sanitizedParams.id);

  try {
    await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);

    res.sendStatus(200);
  } catch (error) {
    internalServerError(res, error);
  }
}

async function updateById(req, res) {
  const { rentDate, daysRented, originalPrice } = res.locals;
  const id = Number(res.sanitizedParams.id);

  const returnDate = dayjs().format("YYYY-MM-DD");

  const delayFee = calculateDelayFee(
    returnDate,
    rentDate,
    daysRented,
    originalPrice
  );

  try {
    await db.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, listAll, deleteById, updateById };
