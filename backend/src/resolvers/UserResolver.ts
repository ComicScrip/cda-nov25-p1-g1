import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { getCurrentUser } from "../auth";
import type { GraphQLContext } from "../types";
import { UserRole } from "../entities/User";

@Resolver()
export default class UserResolver {

  // Réservé à l'admin
  @Authorized([UserRole.Admin])
  @Query(() => [User])
  async users() {
    return User.find();
  }

  // Utilisateur courant (admin OU player)
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: GraphQLContext): Promise<User | null> {
    try {
      return await getCurrentUser(context);
    } catch {
      return null;
    }
  }
}
