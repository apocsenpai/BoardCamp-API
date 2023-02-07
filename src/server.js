import express, { json } from "express";
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());
server.use(json());



server.listen(PORT, () => console.log(`Server is listening in PORT: ${PORT}`));
