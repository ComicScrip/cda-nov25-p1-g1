import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./db";
import env from "./env";
import { Like } from "typeorm";
import { User } from "./entities/User";
import { Game } from "./entities/Game";
import { Attempt } from "./entities/Attempt";
import { Word } from "./entities/Word";
import UserResolver from "./resolvers/UserResolver";
import WordResolver from "./resolvers/WordResolver";
import { buildSchema } from "type-graphql";

async function start() {
  await db.initialize();
  const schema = await buildSchema({ resolvers: [UserResolver, WordResolver] });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: env.GRAPHQL_SERVER_PORT },
  });
  console.log(`graphql server ready on ${url}`);
}

start();
