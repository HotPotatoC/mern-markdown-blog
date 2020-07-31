FROM node:14.0

WORKDIR /usr/src/app

EXPOSE 3000

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --silent

COPY . .

CMD ["yarn", "start"]