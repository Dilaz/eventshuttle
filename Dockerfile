FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY . .

RUN npm install --include=dev && npm install -g typescript
RUN npm run build
RUN npm prune --production

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app/node_modules ./node_modules
COPY --from=0 /usr/src/app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["node", "dist/src/main.js"]
