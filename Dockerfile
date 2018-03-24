FROM node:alpine
RUN apk add --no-cache git

COPY . /app

WORKDIR /app

RUN yarn install

RUN yarn clone

RUN yarn build

EXPOSE 8080

CMD ["node", "dist"]