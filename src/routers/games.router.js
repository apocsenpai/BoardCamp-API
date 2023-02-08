import { Router } from "express";
import gamesController from "../controllers/games.controller.js";
import { isGameAlreadyExist } from "../middlewares/games.middlewares.js";
import validateSchema from "../middlewares/global.middlewares.js";
import gameSchema from "../schemas/gameSchema.js";

const router = Router("/games");

router.post("/", validateSchema(gameSchema), isGameAlreadyExist, gamesController.create);

export { router as gamesRouter };
