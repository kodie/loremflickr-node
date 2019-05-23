FROM node:10

RUN apt-get update && apt-get -y install build-essential

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY / ./

RUN cp settings-example.json settings.json

EXPOSE 3000

CMD ["node", "server.js"]