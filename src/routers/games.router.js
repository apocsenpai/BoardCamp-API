import { Router } from "express";
import gamesController from "../controllers/games.controller.js";
import {
  isDataAlreadyExist,
  validateSchema,
} from "../middlewares/global.middlewares.js";
import gameSchema from "../schemas/gameSchema.js";

const router = Router("/games");

router.post(
  "/",
  validateSchema(gameSchema),
  isDataAlreadyExist("games", "name"),
  gamesController.create
);
router.get("/", gamesController.listAll);

export { router as gamesRouter };
