import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
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
  await db.query("DROP TABLE IF EXISTS user");

  const schemaStatements = [
    `CREATE TABLE IF NOT EXISTS Word (
      id_word INTEGER PRIMARY KEY,
      label VARCHAR(50),
      difficulty VARCHAR(50),
      category VARCHAR(50)
    )`,
    `CREATE TABLE IF NOT EXISTS Attempt (
      id_attempt INTEGER PRIMARY KEY,
      letter VARCHAR(1),
      is_correct INTEGER,
      attempt_date DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS Statistic (
      id_statistic INTEGER PRIMARY KEY,
      games_played INTEGER,
      games_won INTEGER,
      games_lost INTEGER,
      total_score INTEGER,
      best_score INTEGER
    )`,
    `CREATE TABLE IF NOT EXISTS Ranking (
      id_ranking VARCHAR(50) PRIMARY KEY,
      position_ INTEGER,
      score INTEGER,
      ranking_date DATE
    )`,
    `CREATE TABLE IF NOT EXISTS User_ (
      id_user INTEGER PRIMARY KEY,
      username VARCHAR(50),
      role VARCHAR(50),
      password VARCHAR(50),
      creation_date DATE,
      id_ranking VARCHAR(50),
      id_statistic INTEGER,
      FOREIGN KEY(id_ranking) REFERENCES Ranking(id_ranking),
      FOREIGN KEY(id_statistic) REFERENCES Statistic(id_statistic)
    )`,
    `CREATE TABLE IF NOT EXISTS Game (
      id_game INTEGER PRIMARY KEY,
      start_date DATETIME,
      end_date DATETIME,
      status VARCHAR(50),
      max_errors INTEGER,
      score INTEGER,
      id_attempt INTEGER,
      id_word INTEGER,
      id_user INTEGER,
      FOREIGN KEY(id_attempt) REFERENCES Attempt(id_attempt),
      FOREIGN KEY(id_word) REFERENCES Word(id_word),
      FOREIGN KEY(id_user) REFERENCES User_(id_user)
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