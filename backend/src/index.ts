import "reflect-metadata";
import { fastifyApolloHandler } from "@as-integrations/fastify";
import { initApollo } from "./appollo";
import db from "./db";
import env from "./env";
import { initFastify } from "./fastify";


async function start() {
  await db.initialize();
  const fastify = await initFastify();
  const apollo = await initApollo(fastify);

  await apollo.start();
  fastify.route({
    method: ["GET", "POST"],
    url: "/",
    handler: fastifyApolloHandler(apollo as any, {
      context: async (req: any, res: any) => ({ req, res }),
    }),
  });

  await fastify.listen({ port: env.GRAPHQL_SERVER_PORT as number });
  console.log(`Server running at http://localhost:${env.GRAPHQL_SERVER_PORT}/`);
}

start();
