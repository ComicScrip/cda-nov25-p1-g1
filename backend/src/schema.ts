import { buildSchema } from "type-graphql";
import  AuthResolver from "./resolvers/AuthResolver";
import UserResolver from "./resolvers/UserResolver";
import { authChecker } from "./auth";

export async function getSchema() {
    return buildSchema({
        resolvers: [AuthResolver, UserResolver],
        authChecker,
    });
}
