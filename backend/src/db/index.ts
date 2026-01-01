import { DataSource } from "typeorm";
import { join } from "path";

export default new DataSource({
  type: "sqlite",
  database: join(__dirname, "db.sqlite"),
  entities: [join(__dirname, "..", "entities", "*.{ts,js}")],
  synchronize: true,
  //logging: true
});
