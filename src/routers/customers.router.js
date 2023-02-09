import { Router } from "express";
import customersController from "../controllers/customers.controller.js";
import {
  isDataAlreadyExist,
  validateSchema,
} from "../middlewares/global.middlewares.js";
import createCustomerSchema from "../schemas/customer.schemas/create.js";
import showCustomerByIdSchema from "../schemas/customer.schemas/show.js";

const router = Router("/customers");

router.post(
  "/",
  validateSchema(createCustomerSchema),
  isDataAlreadyExist("customers", "cpf"),
  customersController.create
);
router.get("/", customersController.listAll);
router.get("/:id", validateSchema(showCustomerByIdSchema), customersController.listById);

export { router as customersRouter };
