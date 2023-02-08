import db from "../database/database.connection.js";
import internalServerError from "../utils/functions/internalServerError.js";

export const isGameAlreadyExist = async (req, res, next) => {
  const { name } = res.sanitizedParams;

  try {
    const { rowCount } = await db.query(`SELECT * FROM games WHERE name = $1`, [
      name,
    ]);

    if (rowCount)
      return res.status(409).send({ message: `Jogo já existente!` });

    next();
  } catch (error) {
    internalServerError(res, error);
  }
};
