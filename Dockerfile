FROM node:carbon

WORKDIR /dist

RUN yarn global add nodemon

COPY package*.json ./

RUN yarn install


COPY app /dist

EXPOSE 3000
CMD ["node", "index.js"]