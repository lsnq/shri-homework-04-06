FROM node:alpine

WORKDIR /app

COPY package.json package.json

RUN yarn install

COPY dist dist

EXPOSE 8080

CMD ["yarn", "start"]