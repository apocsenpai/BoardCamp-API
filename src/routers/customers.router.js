import { Router } from "express";
import customersController from "../controllers/customers.controller.js";
import { buildListCustomersQuery, verifyCpfOwner } from "../middlewares/customers.middlewares.js";
import {
  isDataAlreadyExist,
  validateSchema,
} from "../middlewares/global.middlewares.js";
import createCustomerSchema from "../schemas/customers.schemas/create.js";
import showCostumerSchema from "../schemas/customers.schemas/show.js";
import updateCustomerSchema from "../schemas/customers.schemas/update.js";
import idSchema from "../schemas/id.schema.js";

const router = Router("/customers");

router.post(
  "/",
  validateSchema(createCustomerSchema),
  isDataAlreadyExist("customers", "cpf"),
  customersController.create
);

router.get(
  "/",
  validateSchema(showCostumerSchema),
  buildListCustomersQuery,
  customersController.listAll
);
router.get("/:id", validateSchema(idSchema), customersController.listById);

router.put(
  "/:id",
  validateSchema(updateCustomerSchema),
  verifyCpfOwner,
  customersController.update
);

export { router as customersRouter };
