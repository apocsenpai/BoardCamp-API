import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const configDb = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "prod") configDb.ssl = true;

const db = new Pool(configDb);

export default db;
