import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { User } from "../entities/User";
import db from "./index";

export async function clearDB() {
  await unlink(resolve("src/db/db.sqlite"));
}

async function main() {
  await clearDB().catch(console.error);
  await db.initialize();

  const usr1 = User.create({ email: "user1@email.com" });
  const usr2 = User.create({ email: "user2@email.com" });
  const usr3 = User.create({ email: "user1@email.com" });

  await usr1.save();
  await usr2.save();
  await usr3.save();

  await db.destroy();
  console.log("done !");
}

main();
