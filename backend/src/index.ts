import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./db";
import env from "./env"; // ton module pour récupérer .env
import { buildSchema } from "type-graphql";

import UserResolver from "./resolvers/UserResolver";

//Script de démarage
async function start() {

  //  Init DB
  if (!db.isInitialized) await db.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });


  const server = new ApolloServer({ schema });


  const { url } = await startStandaloneServer(server, {
    listen: { port: env.GRAPHQL_SERVER_PORT || 4000 },
  });

  console.log(`🚀 GraphQL server ready at ${url}`);
}

start().catch((err) => console.error(err));
