import { Resolver, Mutation, Arg, Int, Authorized, Ctx } from "type-graphql";
import { Game } from "../entities/Game";
import { Word } from "../entities/Word"; 
import { User } from "../entities/User"; 
import { getCurrentUser } from "../auth";
import type { GraphQLContext } from "../types";
@Resolver()
export class GameResolver {
  @Authorized()
  @Mutation(() => Game)
  async saveGame(
    @Arg("idWord", () => Int) idWord: number,
    @Arg("status") status: string,
    @Arg("errors", () => Int) errors: number,
    @Arg("usedHint") usedHint: boolean,
    @Ctx() context: GraphQLContext
  ): Promise<Game> {
    const currentUser = await getCurrentUser(context);
    
    // 1. Charger l'utilisateur pour modifier ses statistiques
    const user = await User.findOneBy({ idUser: currentUser.idUser });
    if (!user) throw new Error("Utilisateur non trouvé");

    // 2. Charger le mot pour le bonus de difficulté
    const word = await Word.findOneBy({ idWord });
    if (!word) throw new Error("Mot non trouvé");

    // 3. Calcul du score progressif (Facile/Moyen/Difficile)
    let finalScore = 0;
    if (status === "WON") {
      const baseScore = 100;
      const penalty = (errors * 10) + (usedHint ? 50 : 0);
      
      const diff = word.difficulty.toUpperCase();
      const bonusPerLetter = diff === "DIFFICILE" ? 20 : diff === "MOYEN" ? 10 : 0;
      
      finalScore = Math.max(10, baseScore - penalty + (word.label.length * bonusPerLetter));
    }

    // 4. Mise à jour de l'utilisateur
    user.gamesPlayed += 1;
    if (status === "WON") {
      user.gamesWon += 1;
      user.totalScore += finalScore;
      if (finalScore > user.bestScore) {
        user.bestScore = finalScore;
      }
    }
    await user.save();

    // 5. Enregistrement de la partie
    const newGame = new Game();
    newGame.score = finalScore;
    newGame.status = status;
    newGame.idUser = user.idUser;
    newGame.startDate = new Date(); 
    newGame.endDate = new Date();
    newGame.word = word;

    return await Game.save(newGame);
  }
}