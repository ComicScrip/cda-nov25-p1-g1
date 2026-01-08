import { load } from "ts-dotenv";

export default load({
  GRAPHQL_SERVER_PORT: Number,
  CORS_ALLOWED_ORIGINS: String,
  JWT_SECRET: String,
  NODE_ENV: ["development" as const, "production" as const, "test" as const]
});
