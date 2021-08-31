FROM node:latest

COPY . ./app

WORKDIR /app/src

RUN npm install -g typescript tsc ts-node nodemon

RUN npm install

EXPOSE 8000

CMD ["yarn", "start"]

