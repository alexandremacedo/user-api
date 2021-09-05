<h1 align="center">
  <img alt="user-api" title="user-api" src=".github/programming-code-signs.png" width="100px" />
</h1>

<h3 align="center">
  User api - Api for authentication and user search
</h3>

<h4 align="center">
  NodeJS + Docker + Typescript
</h4>
</br>


<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexandreMacedo/user-api?color=%2304D361">

  <a href="https://github.com/AlexandreMacedo">
    <img alt="Made by Alexandre" src="https://img.shields.io/badge/made%20by-Alexandre-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/AlexandreMacedo/user/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/AlexandreMacedo/user-api?style=social">
  </a>
</p>

<p align="center">
  <a href="#needed">Needed</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-use">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#endpoints">Endpoints</a>
</p>


# user-api
This project was built with NodeJS and TypeScript to provides authentication and user search

## Needed

- Git (https://git-scm.com/)
- Yarn (https://yarnpkg.com/lang/en/)
- Node (https://nodejs.org/en/)
- Docker (https://www.docker.com/products/docker-desktop)

## How to use
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

Cloning
```bash
# Clone this repository
$ git clone https://github.com/AlexandreMacedo/user-api.git

# Go into the repository
$ cd user-api
```

To run in dev mode
```bash
# Install all dependencies
$ yarn

# Create and start database
$ yarn database:create
# You should create the database "user_api" by the hands

# Running migrations
$ yarn typeorm migration:run

# Start the dev server
$ yarn dev

# Server is running at http://localhost:3333
```

To run with containers
```bash
# Create and start database
$ docker-compose up --build -d

# Running migrations
$ yarn typeorm migration:run

# Server is running at http://localhost:3333
```

## Endpoints
Routes:

Method | Endpoint | Controller | Action | Authentication
--- | --- | --- | --- | ---
POST   | /users/signup                    | \src\modules\users\infra\controllers\UserController                                 | store      | no
POST   | /signin                          | \src\modules\users\infra\controllers\AuthenticateController                         | store      | no
GET    | /users                           | \src\modules\users\infra\controllers\UserController                                 | list one   | yes

## Doc API
- Soon

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
