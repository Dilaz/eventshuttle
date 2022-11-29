# Eventshuttle 

Eventshuffle is an application to help scheduling events with friends, quite like http://doodle.com/ but in a much simplified way. An event is created by posting a name and suitable dates to the backend, events can be queried from the backend and participants can submit dates suitable for them.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dev env
```bash
docker-compose up -d
```

## Run migrations
```bash
npx knex migrate:latest
```
