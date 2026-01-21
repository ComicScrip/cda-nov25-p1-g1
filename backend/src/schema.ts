import { buildSchema } from "type-graphql";
import  AuthResolver from "./resolvers/AuthResolver";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";
import { WordResolver } from "./resolvers/GameResolver";
import { GameResolver } from "./resolvers/SaveGameResolver";

export async function getSchema() {
    return buildSchema({
        resolvers: [AuthResolver, UserResolver, WordResolver, GameResolver],
        authChecker,
    });
}
