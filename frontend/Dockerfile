FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./

RUN ["npm","ci"]

COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY postcss.config.mjs ./ 
COPY .env .env


CMD ["npm","run","dev"]
