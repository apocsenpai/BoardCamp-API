import express, { json } from "express";
import cors from "cors";
import { gamesRouter } from "./routers/games.router.js";
import { customersRouter } from "./routers/customers.router.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use("/games", gamesRouter);
app.use("/customers", customersRouter);

app.listen(PORT, () => console.log(`Server is listening in PORT: ${PORT}`));
