FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn install --production=false

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]