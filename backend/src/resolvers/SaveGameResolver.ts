import { Resolver, Mutation, Arg, Int } from "type-graphql";
import { Game } from "../entities/Game";
import { Word } from "../entities/Word"; // Import nécessaire pour la relation
import db from "../db";

@Resolver()
export class GameResolver {
  @Mutation(() => Game)
  async saveGame(
    @Arg("score", () => Int) score: number,
    @Arg("idWord", () => Int) idWord: number,
    @Arg("status") status: string
  ): Promise<Game> {
    const gameRepository = db.getRepository(Game);

    const newGame = new Game();
    newGame.score = score;
    newGame.status = status;
    newGame.startDate = new Date();
    newGame.endDate = new Date();

    // On utilise la propriété 'word' suggérée par l'erreur.
    // On passe un objet partiel avec l'ID pour que TypeORM fasse le lien.
    newGame.word = { idWord: idWord } as Word; 

    return await gameRepository.save(newGame);
  }
}