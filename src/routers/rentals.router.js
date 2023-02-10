import { Router } from "express";
import rentalsController from "../controllers/rentals.controller.js";
import {
  checkIdIsRegisteredInThatTable,
  validateSchema,
} from "../middlewares/global.middlewares.js";
import { checkGameIsAvailable } from "../middlewares/rentals.middlewares.js";
import createRentalSchema from "../schemas/rentals.schemas/create.js";

const router = Router("/rentals");

router.post(
  "/",
  validateSchema(createRentalSchema),
  checkIdIsRegisteredInThatTable("customers", "customerId"),
  checkIdIsRegisteredInThatTable("games", "gameId"),
  checkGameIsAvailable,
  rentalsController.create
);
router.post("/rentals/:id/return");

router.get("/", rentalsController.listAll);

router.delete("/:id");

export { router as rentalsRouter };
