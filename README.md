<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Challenge

### Requirements (3 days):
- Use NestJs to create a restful-API using the db scheme and the endpoint description in the AppIndex
- Try not to use the ORM for serialization and making the query.
- Use custom validation pipe /decorators 
- Document how to fire up the project
- Please use a git based version control and share the repo with us 

### Extra (2 days):
- Use redis or any other in-memory cache technique.  
- Create docker containers for the user service with it's database. The system consists of three containers:
    A relational database service of your choice (ex: mysql, mssql, postgres, etc...)
    A node js service running the NestJs framework
    A redis instance

### Extra for a full stack position (2 days):
- Create react app (looks are not important) using the endpoints you created in NestJs and ship it with the project
    Login / Register / Profile

## DataBase

![Diagrama en blanco](https://user-images.githubusercontent.com/11724728/125210603-431ea700-e277-11eb-9882-5711c86d02ed.png)

Every column in every table must be not null.

## Endpoints 

- [POST] Create new user 
```
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username={username}' \
--data-urlencode 'password={password}' \
--data-urlencode 'name={name}' \
--data-urlencode 'address={addressName}' \
--data-urlencode 'cityId={cityId}'
```

- [POST] Login existing user, return value: jwt token
```
curl --location --request POST 'localhost:3000/users/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username={username}' \
--data-urlencode 'password={password}'
```

- [GET] Get existing user for specific jwt token
```
curl --location --request GET 'localhost:3000/users/profile' \
--header 'Authorization: Bearer {tokenJwt}' \
```

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
