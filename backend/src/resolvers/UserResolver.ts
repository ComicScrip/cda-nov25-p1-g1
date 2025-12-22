import { Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }
}
