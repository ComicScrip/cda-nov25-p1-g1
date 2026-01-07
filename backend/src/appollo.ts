import type { FastifyInstance} from "fastify";
import { getSchema } from "./schema";
import type { GraphQLContext } from "./types";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import { ApolloServer } from "@apollo/server";

export async function initApollo(fastify: FastifyInstance) {
    return new ApolloServer<GraphQLContext>({
        schema: await getSchema(),
        plugins: [fastifyApolloDrainPlugin(fastify)],
    });
}
