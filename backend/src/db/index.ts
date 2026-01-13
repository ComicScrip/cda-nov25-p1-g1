import { DataSource } from "typeorm";
import env from "../env";

export default new DataSource({
  type: "postgres",
  host: env.DB_HOST as string,
  port: env.DB_PORT as number,
  username: env.DB_USERNAME as string,
  password: env.DB_PASSWORD as string,
  database: env.DB_NAME as string,
  entities: ["src/entities/*.ts"],
  synchronize: true,
  //logging: true
});

