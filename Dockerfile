FROM node:alpine

COPY . /app
WORKDIR /app
RUN yarn install
EXPOSE 8080

CMD ["node", "dist"]