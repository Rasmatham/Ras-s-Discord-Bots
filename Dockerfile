FROM node:latest

WORKDIR /usr/src/ras-s-discord-bots

COPY . .

RUN npm i

RUN npx tsc

CMD [ "node", "AllTheBots"]