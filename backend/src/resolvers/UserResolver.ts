import { Arg, Int, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

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
}
