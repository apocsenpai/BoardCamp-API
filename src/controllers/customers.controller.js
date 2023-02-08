import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";

async function create(req, res) {
  const { name, phone, cpf, birthday } = res.sanitizedParams;

  try {
    await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {
    internalServerError(res, error);
  }
}

async function listAll(req, res) {
  try {
    const { rows: customers } = await db.query("SELECT * FROM customers");

    res.send(customers);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, listAll };
