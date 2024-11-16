FROM node:alpine

WORKDIR /usr/src/ras-s-discord-bots

COPY ./package.json .

RUN npm i
COPY . .
RUN npx tsc

CMD [ "node", "AllTheBots"]