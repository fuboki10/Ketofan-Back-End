import config = require('config');

interface IConfig {
  [key: string]: any;
}

const knexConfig : IConfig = {
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

export default knexConfig;
