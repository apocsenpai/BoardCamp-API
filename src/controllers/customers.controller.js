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
  const { query } = res.locals;
  
  try {
    const { rows: customers } = await db.query(query);

    res.send(customers);
  } catch (error) {
    internalServerError(res, error);
  }
}

async function listById(req, res) {
  const id = Number(res.sanitizedParams.id);

  try {
    const { rowCount, rows: customers } = await db.query(
      `SELECT * FROM customers WHERE id = $1`,
      [id]
    );

    if (!rowCount) return res.sendStatus(404);

    res.send(customers[0]);
  } catch (error) {
    internalServerError(res, error);
  }
}

async function update(req, res) {
  const id = Number(res.sanitizedParams.id);
  const { name, phone, cpf, birthday } = res.sanitizedParams;

  try {
    await db.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
      [name, phone, cpf, birthday, id]
    );

    return res.sendStatus(200);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, listAll, listById, update };
