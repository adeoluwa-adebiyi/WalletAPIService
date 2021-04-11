FROM node:latest

COPY . ./app

WORKDIR /app/src

RUN npm install -g typescript tsc ts-node nodemon

RUN yarn install

CMD ["yarn", "watch"]

