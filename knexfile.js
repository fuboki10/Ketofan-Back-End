const config = require('config');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB || config.get('DB'),
    migrations: {
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB || config.get('DB'),
    migrations: {
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB || config.get('DB'),
    migrations: {
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },
};
