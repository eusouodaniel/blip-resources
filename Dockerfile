FROM node:10-alpine

WORKDIR /usr/app
COPY package.json ./

RUN yarn

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["yarn", "dev"]
