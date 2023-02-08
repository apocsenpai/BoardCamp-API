import express, { json } from "express";
import cors from "cors";
import { gamesRouter } from "./routers/games.router.js";

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());
server.use(json());

server.use("/games", gamesRouter);

server.listen(PORT, () => console.log(`Server is listening in PORT: ${PORT}`));
