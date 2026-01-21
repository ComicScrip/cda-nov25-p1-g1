import { buildSchema } from "type-graphql";
import  AuthResolver from "./resolvers/AuthResolver";
import UserResolver from "./resolvers/UserResolver";
import WordResolver from "./resolvers/WordResolver";
import { GameResolver } from "./resolvers/SaveGameResolver";
import { authChecker } from "./auth";

export async function getSchema() {
    return buildSchema({
        resolvers: [AuthResolver, UserResolver, WordResolver, GameResolver],
        authChecker,
    });
}
