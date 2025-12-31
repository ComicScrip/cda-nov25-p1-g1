import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { User, YouAre } from "../entities/User"
import { seedWords } from "./seedWords";
import { Word, CreateWord } from "../entities/Word";
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
  await db.query("DROP TABLE IF EXISTS Game");
  await db.query("DROP TABLE IF EXISTS Attempt");
  await db.query("DROP TABLE IF EXISTS Word");
  await db.query("DROP TABLE IF EXISTS User");
  await db.synchronize();

  //user trucs
  const alice = User.create({
    username: "alice",
    role: YouAre.PLAYER,
    password: "password123",
    creationDate: new Date(),
    gamesPlayed: 0,
    gamesWon: 0,
    totalScore: 0,
    bestScore: 0,
  });

  const bob = User.create({
    username: "bob",
    role: YouAre.GUEST,
    password: null,
    creationDate: new Date(),
    gamesPlayed: 0,
    gamesWon: 0,
    totalScore: 0,
    bestScore: 0,
  });

  const charlie = User.create({
    username: "charlie",
    role: YouAre.ADMIN,
    password: "Admin123",
    creationDate: new Date(),
    gamesPlayed: 0,
    gamesWon: 0,
    totalScore: 0,
    bestScore: 0,
  });


  await alice.save();
  await bob.save();
  await charlie.save();


  //words trucs
  for (const w of seedWords) {
    const word: CreateWord = {
      label: w.label,
      difficulty: w.difficulty,
      category: w.category,
    };
    await Word.create(word).save();
  } 
}




async function main() {
  await removeDBFile();
  await createSchema();
  await db.destroy();
  console.log("done !");
}

main().catch((error) => {
  console.error(error);
  if (db.isInitialized) {
    db.destroy();
  }
});
