FROM node:14.0

WORKDIR /usr/src/app

EXPOSE 5000

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --silent \
    && yarn add -g --silent nodemon

COPY ./nodemon.json/ ./
COPY ./.env/ ./
COPY ./src/ ./

CMD ["yarn", "dev"]