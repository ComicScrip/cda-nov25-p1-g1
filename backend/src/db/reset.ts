import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { User } from "../entities/User"
import { World } from "../entities/World";
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

  const schemaStatements = [
    `CREATE TABLE IF NOT EXISTS User (
      id_user INTEGER PRIMARY KEY,
      username VARCHAR(50),
      role VARCHAR(50),
      password VARCHAR(50),
      creation_date DATE,
      games_played INT  NOT NULL,
      games_won INT NOT NULL,
      total_score INT NOT NULL,
      best_score INT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS Word (
      id_word INTEGER PRIMARY KEY,
      label VARCHAR(50),
      difficulty VARCHAR(50) CHECK (difficulty IN ('Facile','Moyen','Difficile')),
      category VARCHAR(50)
    )`,
    `CREATE TABLE IF NOT EXISTS Attempt (
      id_attempt INTEGER PRIMARY KEY,
      letters VARCHAR(1),
      is_correct INTEGER, 
      attempt_date DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS Game (
      id_game INTEGER PRIMARY KEY,
      start_date DATETIME,
      end_date DATETIME,
      status VARCHAR(50),
      max_errors INTEGER,
      score INTEGER,
      id_attempt INTEGER NOT NULL,
      id_word INTEGER NOT NULL,
      id_user INTEGER NOT NULL,
      FOREIGN KEY(id_attempt) REFERENCES Attempt(id_attempt),
      FOREIGN KEY(id_word) REFERENCES Word(id_word),
      FOREIGN KEY(id_user) REFERENCES User(id_user)
    )`,
  ];

  for (const statement of schemaStatements) {
    await db.query(statement);
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
  db.destroy();
});
