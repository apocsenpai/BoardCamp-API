import { Router } from "express";
import customersController from "../controllers/customers.controller.js";
import {
  isDataAlreadyExist,
  validateSchema,
} from "../middlewares/global.middlewares.js";
import customerSchema from "../schemas/customerSchema.js";

const router = Router("/customers");

router.post(
  "/",
  validateSchema(customerSchema),
  isDataAlreadyExist("customers", "cpf"),
  customersController.create
);
router.get("/", customersController.listAll);

export { router as customersRouter };
