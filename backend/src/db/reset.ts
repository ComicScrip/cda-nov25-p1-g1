import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { User } from "../entities/User"
import { Word } from "../entities/Word";
import { Attempt } from "../entities/Attempt";
import { Game } from "../entities/Game";
import db from "./index";

async function removeDBFile() {
  try {
    await unlink(resolve("src/db/db.sqlite"));
  } catch (error: any) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}


async function createSchema() {

  await db.initialize();
  await db.query("PRAGMA foreign_keys = ON");
  // await db.query("DROP TABLE IF EXISTS Game");
  // await db.query("DROP TABLE IF EXISTS Attempt");
  // await db.query("DROP TABLE IF EXISTS Word");
  // await db.query("DROP TABLE IF EXISTS User");

  const alice = User.create({
    username: "alice",
    role: "player",
    password: "password123",
    creationDate: new Date(),
    gamesPlayed: 0,
    gamesWon: 0,
    totalScore: 0,
    bestScore: 0,
  });
  await alice.save();


}

async function main() {
  await removeDBFile();
  await createSchema();
  await db.destroy();
  console.log("done !");
}

main().catch((error) => {
  console.error(error);
  db.destroy();
});
