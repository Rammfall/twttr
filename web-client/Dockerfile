FROM node:16.17.0-alpine3.16

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

EXPOSE 4000

CMD ["npm", "start"]
