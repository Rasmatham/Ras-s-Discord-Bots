FROM node:latest

WORKDIR /usr/src/ras-s-discord-bots

COPY package.json ./

RUN npm install

RUN npm install typescript --location=global

COPY . .

RUN tsc

CMD [ "node", "AllTheBots"]