FROM node:16.13.1-alpine3.15

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
