import { Resolver, Mutation, Arg, Int, Authorized, Ctx } from "type-graphql";
import { Game } from "../entities/Game";
import { Word } from "../entities/Word"; // Import nécessaire pour la relation
import db from "../db";
import { getCurrentUser } from "../auth";
import type { GraphQLContext } from "../types";

@Resolver()
export class GameResolver {
  @Authorized()
  @Mutation(() => Game)
  async saveGame(
    @Arg("score", () => Int) score: number,
    @Arg("idWord", () => Int) idWord: number,
    @Arg("status") status: string,
    @Arg("maxErrors", () => Int) maxErrors: number,
    @Ctx() context: GraphQLContext
  ): Promise<Game> {
    const gameRepository = db.getRepository(Game);
    const currentUser = await getCurrentUser(context);

    const newGame = new Game();
    newGame.score = score;
    newGame.status = status;
    newGame.maxErrors = maxErrors;
    newGame.idUser = currentUser.idUser;
    newGame.startDate = new Date();
    newGame.endDate = new Date();

    // On utilise la propriété 'word' suggérée par l'erreur.
    // On passe un objet partiel avec l'ID pour que TypeORM fasse le lien.
    newGame.word = { idWord: idWord } as Word;

    return await gameRepository.save(newGame);
  }
}
