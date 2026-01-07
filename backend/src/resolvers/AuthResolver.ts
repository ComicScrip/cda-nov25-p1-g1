import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { User } from "../entities/User";
import { AdminLoginInput } from "../inputs/AdminLoginInput";
import { verify } from "argon2";

@Resolver()
export default class AuthResolver {
  @Mutation(() => Boolean)
  async adminLogin(
    @Arg("data", () => AdminLoginInput, { validate: true })
    data: AdminLoginInput
  ): Promise<boolean> {
    const user = await User.findOne({ where: { username: data.username } });

    if (!user || user.role !== "ADMIN") {
      throw new GraphQLError("Identifiants invalides");
    }

    const ok = await verify(user.hashedPassword, data.password);
    if (!ok) {
      throw new GraphQLError("Identifiants invalides");
    }

    return true;
  }
}
