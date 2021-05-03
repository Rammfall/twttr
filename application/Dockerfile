FROM node:14.6.1

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
