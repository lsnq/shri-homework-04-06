FROM node:alpine

COPY . /app

WORKDIR /app

RUN yarn install

RUN yarn build

RUN mkdir -p test3

EXPOSE 8080

CMD ["node", "dist"]