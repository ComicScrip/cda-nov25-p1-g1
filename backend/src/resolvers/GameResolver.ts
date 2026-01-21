import { Resolver, Query, Arg } from "type-graphql";
import { Word } from "../entities/Word";

@Resolver()
export class WordResolver {
  @Query(() => Word, { nullable: true })
  async getRandomWord(
    @Arg("difficulty") difficulty: string
  ): Promise<Word | null> {
    // Utilise TypeORM pour récupérer un mot aléatoire selon la difficulté
    return await Word.createQueryBuilder("word")
      .where("word.difficulty = :difficulty", { difficulty })
      .orderBy("RANDOM()") // Pour PostgreSQL/SQLite. Utilise RAND() pour MySQL.
      .getOne();
  }
}