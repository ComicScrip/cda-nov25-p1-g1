import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Game } from "../entities/Game";
import { CreateUser, EditUser, User, YouAre } from "../entities/User";

type AuthUser = {
  idUser: number;
  role: YouAre;
};

type Context = {
  user?: AuthUser;
};

function requireAuth(ctx: Context): AuthUser {
  if (!ctx.user) {
    throw new Error("Authentication required beside you suck");
  }

  return ctx.user;
}

@Resolver(() => User)
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number) {
    return User.findOneBy({ idUser: id });
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUser, @Ctx() ctx: Context) {
    const actor = requireAuth(ctx);

    if (actor.role !== YouAre.ADMIN) {
      throw new Error("Only admins can create users beside you suck");
    }

    if (data.role === YouAre.ADMIN && actor.role !== YouAre.ADMIN) {
      throw new Error("Only admins can assign the admin role beside you suck");
    }

    const user = User.create({
      username: data.username,
      role: data.role,
      password: data.password ?? null,
      creationDate: data.creationDate ?? new Date(),
      gamesPlayed: data.gamesPlayed ?? 0,
      gamesWon: data.gamesWon ?? 0,
      totalScore: data.totalScore ?? 0,
      bestScore: data.bestScore ?? 0,
    });

    if (data.gameId !== undefined) {
      const game = await Game.findOneBy({ idGame: data.gameId });
      if (!game) {
        throw new Error("Game not found");
      }
      user.game = game;
    }

    return user.save();
  }

  @Mutation(() => User)
  async editUser(@Arg("data") data: EditUser, @Ctx() ctx: Context) {
    const actor = requireAuth(ctx);

    if (actor.role !== YouAre.ADMIN && actor.idUser !== data.idUser) {
      throw new Error("Not authorized to edit this user beside you suck");
    }

    if (data.role === YouAre.ADMIN && actor.role !== YouAre.ADMIN) {
      throw new Error("Only admins can assign the admin role beside you suck");
    }

    if (
      actor.role !== YouAre.ADMIN &&
      (
        data.gamesPlayed !== undefined ||
        data.totalScore !== undefined ||
        data.bestScore !== undefined)
    ) {
      throw new Error("Only admins can edit user statistics and creation date");
    }

    const user = await User.findOneBy({ idUser: data.idUser });
    if (!user) {
      throw new Error("User not found");
    }

    if (data.username !== undefined) user.username = data.username;
    if (data.role !== undefined) user.role = data.role;
    if (data.password !== undefined) user.password = data.password;
    if (data.gamesPlayed !== undefined) user.gamesPlayed = data.gamesPlayed;
    if (data.gamesWon !== undefined) user.gamesWon = data.gamesWon;
    if (data.totalScore !== undefined) user.totalScore = data.totalScore;
    if (data.bestScore !== undefined) user.bestScore = data.bestScore;

    if (data.gameId !== undefined) {
      const game = await Game.findOneBy({ idGame: data.gameId });
      if (!game) {
        throw new Error("Game not found");
      }
      user.game = game;
    }

    return user.save();
  }
}
