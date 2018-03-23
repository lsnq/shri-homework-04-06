FROM node:alpine
RUN apk add --no-cache git

#COPY . /app

WORKDIR /app

RUN git clone https://github.com/lsnq/shri-homework-04-06.git .

RUN yarn install

RUN yarn build

RUN mkdir -p test3

EXPOSE 8080

CMD ["node", "dist"]