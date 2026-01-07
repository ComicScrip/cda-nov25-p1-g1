import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifCors from "@fastify/cors";
import env from "./env";

export async function initFastify() {
    const fastify = Fastify();
    const origin = env.CORS_ALLOWED_ORIGINS.split(",");

    await fastify.register(fastifCors, {
        origin: origin,
        credentials: true,
    });

    await fastify.register(fastifyCookie);

    return fastify;
}
