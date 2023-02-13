import { Router } from "express";
import rentalsController from "../controllers/rentals.controller.js";
import {
  checkIdIsRegisteredInThatTable,
  validateSchema,
  buildListQuery,
} from "../middlewares/global.middlewares.js";
import {
  checkGameIsAvailable,
  checkReturnDateIsNotNull,
} from "../middlewares/rentals.middlewares.js";
import idSchema from "../schemas/id.schema.js";
import createRentalSchema from "../schemas/rentals.schemas/create.js";
import showRentalSchema from "../schemas/rentals.schemas/show.js";

const router = Router("/rentals");

router.post(
  "/",
  validateSchema(createRentalSchema),
  checkIdIsRegisteredInThatTable("customers", "customerId"),
  checkIdIsRegisteredInThatTable("games", "gameId"),
  checkGameIsAvailable,
  rentalsController.create
);
router.post(
  "/:id/return",
  validateSchema(idSchema),
  checkIdIsRegisteredInThatTable("rentals", "id"),
  checkReturnDateIsNotNull("rentalReturn"),
  rentalsController.updateById
);

router.get(
  "/",
  validateSchema(showRentalSchema),
  buildListQuery("listRentals"),
  rentalsController.listAll
);

router.delete(
  "/:id",
  validateSchema(idSchema),
  checkIdIsRegisteredInThatTable("rentals", "id"),
  checkReturnDateIsNotNull("delete"),
  rentalsController.deleteById
);

export { router as rentalsRouter };
