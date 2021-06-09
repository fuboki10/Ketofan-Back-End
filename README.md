<h1 align="center"> :hospital: Ketofan </h1>

<div align="center">
  
  [![GitHub contributors](https://img.shields.io/github/contributors/fuboki10/Ketofan-Back-End)](https://github.com/fuboki10/Ketofan-Back-End/contributors)
  [![GitHub issues](https://img.shields.io/github/issues/fuboki10/Ketofan-Back-End)](https://github.com/fuboki10/Ketofan-Back-End/issues)
  [![GitHub forks](https://img.shields.io/github/forks/fuboki10/Ketofan-Back-End)](https://github.com/fuboki10/Ketofan-Back-End/network)
  [![GitHub stars](https://img.shields.io/github/stars/fuboki10/Ketofan-Back-End)](https://github.com/fuboki10/Ketofan-Back-End/stargazers)
  [![GitHub license](https://img.shields.io/github/license/fuboki10/Ketofan-Back-End)](https://github.com/fuboki10/Ketofan-Back-End/blob/main/LICENSE)
  <img src="https://img.shields.io/github/languages/count/fuboki10/Ketofan-Back-End" />
  <img src="https://img.shields.io/github/languages/top/fuboki10/Ketofan-Back-End" />
  <img src="https://img.shields.io/github/languages/code-size/fuboki10/Ketofan-Back-End" />
  <img src="https://img.shields.io/github/issues-pr-raw/fuboki10/Ketofan-Back-End" />

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environmental Variables](#environmental-variables)
  - [Running](#running)
  - [Database](#database)
- [Testing](#testing)
  - [Running Unit Tests](#running-unit-tests)
- [API Documentation](#api-documentation)
- [Functional Documentation](#functional-documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contributers](#contributers)

## About The Project

Ketofan is a digital healthcare booking platform. We aim to automate physician, clinic and hospital bookings making healthcare easily accessible.Patients are able to search, compare, and book the best doctors in just 1 minute. Doctors also provide Patients with seamless healthcare experiences.

### Built With

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Jest](https://jestjs.io)
- [PostgreSQL](https://www.postgresql.org)
- [Knex](http://knexjs.org/)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo

```sh
git clone https://github.com/fuboki10/Ketofan-Back-End.git
```

2. Install dependencies (it will create the database automatically)

```sh
npm install
```

### Environmental Variables

For developers, you can directly use our `development.json` located in `config\development.json` or modify it if you like.

For production, you need to make your own `config\production.json` with the following structure.

```json
{
  "JWT_KEY": "foo",
  "JWT_EXPIRES_IN": "30d",
  "NODE_ENV": "production",
  "DB": "postgres://<user>:<password>@<host>:<port>/ketofan",
  "PORT": "3000",
  "SENDGRID_API_KEY": "SG."
}
```

- `JWT_KEY`: Your json web token secret key.
- `JWT_EXPIRES_IN`: The period token can last before expiring expressed in seconds or a string describing a time span
  > Eg: `60`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).
- `DB`: Your database path
  > Eg: `"postgres://<user>:<password>@localhost:<port>/ketofan"` If you're hosting on your localhost server.
- `PORT`: Your api hosting port
- `NODE_ENV`: It **must** be `"production"` in order to run the api on production otherwise use `config\development.json`
- `SENDGRID_API_KEY`: SENDGRID api key to send emails

### Running

1. Running on development

```sh
npm run dev
```

2. Running on production

Upon creating `config\production.json` like in [Environmental Variables](#environmental-variables) section. run this script:

```sh
npm run build
npm start
```

### Database

1. Migration

```sh
npm run migrate
```

2. Seeds

```sh
npm run seed
```

3. Roll back migration

```sh
npm run unmigrate
```

4. Create Database

```sh
npm run db:create
```

<!-- TESTING -->

## Testing

The tests can be found in `tests`, and each controller has its own test file in `tests\unit\controller`. Mongoose models tests are also found in `tests\unit\models` as well as middleware which is located at `tests\unit\middlewares`.

### Running Unit Tests

run the following script:

```sh
npm test
```

<!-- API DOC -->

## API Documentation

https://documenter.getpostman.com/view/10395649/TzXtJLpG

<!-- FUNC DOC -->

## Functional Documentation

install the latest version on npm globally (might require `sudo` if you are on linux):

```sh
npm install -g jsdoc
```

in order to generate the documentation, run the `jsdoc` command:

```sh
jsdoc -r ./src
```

By default, the generated documentation is saved in a directory named `out`. You
can use the `--destination` (`-d`) option to specify another directory.

## Roadmap

See the [open issues](https://github.com/fuboki10/Ketofan-Back-End/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b AmazingFeature-Feat`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin AmazingFeature-Feat`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- Contributers -->

## Contributers

<table>
  <tr>
    <td align="center"><a href="https://github.com/fuboki10"><img src="https://avatars.githubusercontent.com/u/35429211?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Abdelrahman Tarek</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/D4rk1n"><img src="https://avatars.githubusercontent.com/u/44725090?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Abdelrahman Arafat</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Hassan950"><img src="https://avatars.githubusercontent.com/u/42610032?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Hassan Mohamed</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/lido22"><img src="https://avatars.githubusercontent.com/u/42592954?v=4" width="100px;" alt=""/><br /><sub><b>Ahmed Walid</b></sub></a><br /></td>
  </tr>
 </table>
