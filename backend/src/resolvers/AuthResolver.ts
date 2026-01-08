import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import { User, UserRole } from "../entities/User";
import { AdminLoginInput } from "../inputs/AdminLoginInput";
import { endSession, startSession } from "../auth";
import type { GraphQLContext } from "../types";

@Resolver()
export default class AuthResolver {
  @Mutation(() => String)
  async adminLogin(
    @Arg("data", () => AdminLoginInput, { validate: true }) data: AdminLoginInput,
    @Ctx() context: GraphQLContext
  ): Promise<string> {
    const user = await User.findOne({ where: { username: data.username } });

    if (!user || user.role !== UserRole.Admin) {
      throw new GraphQLError("Identifiants invalides");
    }

    if (!user.hashedPassword) {
      throw new GraphQLError("Compte admin invalide");
    }

    const ok = await verify(user.hashedPassword, data.password);
    if (!ok) throw new GraphQLError("Identifiants invalides");

    return startSession(context, user);
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() context: GraphQLContext): Promise<boolean> {
    await endSession(context);
    return true;
  }
}
