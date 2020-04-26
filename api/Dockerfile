FROM node:10.6-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install Dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","start"]