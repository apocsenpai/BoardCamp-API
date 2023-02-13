import { Router } from "express";
import gamesController from "../controllers/games.controller.js";
import {
  buildListQuery,
  isDataAlreadyExist,
  validateSchema,
} from "../middlewares/global.middlewares.js";
import createGameSchema from "../schemas/games.schemas/create.js";
import showGameSchema from "../schemas/games.schemas/show.js";

const router = Router("/games");

router.post(
  "/",
  validateSchema(createGameSchema),
  isDataAlreadyExist("games", "name"),
  gamesController.create
);
router.get(
  "/",
  validateSchema(showGameSchema),
  buildListQuery("listGames"),
  gamesController.listAll
);

export { router as gamesRouter };
