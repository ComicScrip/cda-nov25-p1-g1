import "reflect-metadata";
import db from "./index";
import { seedWords } from "./seedWords";
import { User, UserRole } from "../entities/User";
import { Word } from "../entities/Word";
import { hash } from "argon2";


export async function clearDb() {
  const runner = db.createQueryRunner();
  const dropTables = db.entityMetadatas.map(async (entity) =>
    runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE;`)
  );
  await Promise.all(dropTables);
  await runner.release();
  await db.synchronize();

}


export async function main() {
  try {
    console.log(" Reset database&increment...");

    //  Init DB
    if (!db.isInitialized) await db.initialize();

    await clearDb();
    //ajout donner dans la bdd

    // Admin
    const admin = User.create({
      username: "Admin",
      role: UserRole.Admin,
      creationDate: new Date(),
      hashedPassword: await hash("Admin123%"),
      gamesPlayed: 0,
      gamesWon: 0,
      totalScore: 0,
      bestScore: 0,
    });
    await admin.save();

    // Player
    const nathan = User.create({
      username: "nathan",
      role: UserRole.Player,
      creationDate: new Date(),
      hashedPassword: await hash("Nathan123%"),
      gamesPlayed: 0,
      gamesWon: 0,
      totalScore: 0,
      bestScore: 0,
    });
    await nathan.save();


    //Pour une base de mots complète changer la constante FULLWORDLIST à true.

    const FULLWORDLIST = true;


    if (FULLWORDLIST) {
      for (const w of seedWords) {
        const word = Word.create({
          label: w.label,
          indice: w.indice,
          difficulty: w.difficulty,
          category: w.category,
        });
        await word.save();
      }
    }
    else {

      const words = ["un", "deux", "trois", "quatre"];

      for (const label of words) {
        const word = Word.create({
          label,
          difficulty: "Facile",
          category: "Base",
          indice: "indice"
        });
        await word.save();
      }
    }

    console.log(" Reset done ...");
  } catch (error) {
    console.error(" Reset failed:", error);
  } finally {

    if (db.isInitialized) await db.destroy();
  }
}

main();
