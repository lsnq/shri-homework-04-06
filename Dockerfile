FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

RUN mkdir -p test

EXPOSE 8080

CMD ["yarn", "start"]