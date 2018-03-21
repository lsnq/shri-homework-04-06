FROM node:alpine

COPY . /app
WORKDIR /app
RUN yarn install
RUN mkdir -p test2
EXPOSE 8080

CMD ["node", "dist"]