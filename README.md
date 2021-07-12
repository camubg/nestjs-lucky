<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

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

- [POST] Create new user (default cityId=1)
```
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username={username}' \
--data-urlencode 'password={password}' \
--data-urlencode 'name={name}' \
--data-urlencode 'address={addressName}' \
--data-urlencode 'cityId=1'
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

Please follow the next steps in this order:

```bash
# start db
$ make db_start

# start redis cache
$ make redis_start

# development
$ npm run start

# seed db
$ make db_seed
```

Other useful commands:
```bash
# watch mode
$ npm run start:dev

# stop db
$ make db_stop

# stop redis cache
$ make redis_stop
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
