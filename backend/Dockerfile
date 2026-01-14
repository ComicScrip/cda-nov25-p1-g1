FROM node:lts-alpine
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN ["npm","ci"]


COPY src ./src
COPY tsconfig.json ./
COPY .env .env
CMD ["npm","run","dev"]
