import "reflect-metadata";
import db from "./index";
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



    //mot pour le pendu
    const words = ["un", "deux", "trois", "quatre"];
    const words1 = ["cinq", "six", "sept", "huit"];
    const words2 = ["neuf", "dix", "onze", "douze"];
    for (const label of words) {
      const word = Word.create({
        label,
        difficulty: "Facile",
        category: "Base",
        indice: "indice"
      });
      await word.save();
    }

     for (const label of words1) {
      const word = Word.create({
        label,
        difficulty: "Moyen",
        category: "Base",
        indice: "indice"
      });
      await word.save();
    }
     for (const label of words2) {
      const word = Word.create({
        label,
        difficulty: "Difficile",
        category: "Base",
        indice: "indice"
      });
      await word.save();
    }

    console.log(" Reset done ...");
  } catch (error) {
    console.error(" Reset failed:", error);
  } finally {

    if (db.isInitialized) await db.destroy();
  }
}

main();