import "reflect-metadata";
import db from "./index";
import { User, UserRole } from "../entities/User";
import { Word } from "../entities/Word";
import { hash } from "argon2";

export async function resetDatabase() {
  try {
    console.log(" Reset database&increment...");

    //  Init DB
    if (!db.isInitialized) await db.initialize();

    //  Drop tables
    await db.dropDatabase();

    //  Reset autoincrement SQLite
    await db.query("DELETE FROM sqlite_sequence;");

    //  Recreate schema
    await db.synchronize(true);

    console.log(" Schema recreated ");

    //ajout donner dans la bdd

    // Player
    const nathan = User.create({
      username: "nathan",
      role: UserRole.Player,
      creationDate: new Date(),
      gamesPlayed: 0,
      gamesWon: 0,
      totalScore: 0,
      bestScore: 0,
    });
    await nathan.save();

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



    //mot pour le pendu
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


  } catch (error) {
    console.error(" Reset failed:", error);
  } finally {
    
    if (db.isInitialized) await db.destroy();
  }
}

resetDatabase();