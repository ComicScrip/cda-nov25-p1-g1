FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./

RUN ["npm","ci"]

COPY src ./src
COPY .env .env


CMD ["npm","run","dev"]
