import { DataSource } from "typeorm";
import env from "../env";

export default new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ["src/entities/*.ts"],
  synchronize: true,
  //logging: true
});

