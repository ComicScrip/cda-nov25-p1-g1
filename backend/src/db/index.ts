import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
config(); // charge .env

const db = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH || "src/db/db.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: false,
  logging: false,
});

export default db;