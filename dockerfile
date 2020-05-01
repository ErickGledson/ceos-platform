FROM node:10-alpine

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json

RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

RUN npm install

USER node

COPY --chown=node:node ./src /usr/src/app

EXPOSE 8080

CMD [ "npm", "run", "dev" ]