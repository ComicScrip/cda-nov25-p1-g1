import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { getCurrentUser } from "../auth";
import type { GraphQLContext } from "../types";
import { UserRole } from "../entities/User";

@Resolver()
export default class UserResolver {

  // Réservé à l'admin
  @Authorized(UserRole.Admin)
  @Query(() => [User])
  async users() {
    return User.find();
  }

  // Utilisateur courant (admin OU player) - Simple check
  @Query(() => User)
  async me(@Ctx() context: GraphQLContext): Promise<User | null> {
    try {
      return await getCurrentUser(context);
    } catch {
      return null;
    }
  }


@Authorized()
@Query(() => User)
async myProfile(@Ctx() context: GraphQLContext): Promise<User> {
  const sessionUser = await getCurrentUser(context);
  
  const user = await User.findOne({
    where: { idUser: sessionUser.idUser },
    relations: ["games", "games.word"],
    // On trie par idUser (propriété directe) pour éviter l'erreur TS
    order: {
      idUser: "DESC" 
    }
  });

  if (!user) throw new Error("Utilisateur non trouvé");
  return user;
}
}