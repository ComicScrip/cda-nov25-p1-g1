import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { hash, verify } from "argon2";
import { User, UserRole } from "../entities/User";
import { AdminLoginInput } from "../inputs/AdminLoginInput";
import { LoginInput } from "../inputs/LoginInput";
import { SignUp } from "../inputs/SignUpInput";
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

  @Mutation(() => User)
  async signUp(
    @Arg("data", () => SignUp, { validate: true }) data: SignUp,
    @Ctx() context: GraphQLContext
  ): Promise<User> {
    const alreadyExists = await User.findOne({ where: { username: data.username } });
    if (alreadyExists) {
      throw new GraphQLError("Utilisateur déjà enregistré");
    }
    const hashesTohashes = await hash(data.password);
    const user = User.create({
      username: data.username,
      hashedPassword: hashesTohashes,
      role: UserRole.Player,
      creationDate: new Date(),
      gamesPlayed: 0,
      gamesWon: 0,
      totalScore: 0,
      bestScore: 0,
    });
    await user.save();
    await startSession(context, user);
    return user;
    
  }

  @Mutation(() => User)
  async login(
    @Arg("data", () => LoginInput, { validate: true }) data: LoginInput,
    @Ctx() context: GraphQLContext
  ): Promise<User> {
    const user = await User.findOne({ where: { username: data.username } });
    if (!user) {
      throw new GraphQLError("Identifiants invalides");
    }

    if (user.role !== UserRole.Player) {
      throw new GraphQLError("Utilise la connexion admin");
    }

    if (!user.hashedPassword) {
      throw new GraphQLError("Compte invalide");
    }

    const ok = await verify(user.hashedPassword, data.password);
    if (!ok) throw new GraphQLError("Identifiants invalides");

    await startSession(context, user);
    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() context: GraphQLContext): Promise<boolean> {
    await endSession(context);
    return true;
  }
}
