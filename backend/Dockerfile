FROM node:16-alpine

WORKDIR /ecommerce

COPY . .

RUN npm install

EXPOSE 9000

CMD [ "node","server.js" ]