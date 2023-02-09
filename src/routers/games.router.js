import { Router } from "express";
import gamesController from "../controllers/games.controller.js";
import {
  isDataAlreadyExist,
  validateSchema,
} from "../middlewares/global.middlewares.js";
import createGameSchema from "../schemas/game.schemas/create.js";

const router = Router("/games");

router.post(
  "/",
  validateSchema(createGameSchema),
  isDataAlreadyExist("games", "name"),
  gamesController.create
);
router.get("/", gamesController.listAll);

export { router as gamesRouter };
