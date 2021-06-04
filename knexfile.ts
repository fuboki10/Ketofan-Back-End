import { types } from 'pg';
import config = require('config');

const DATE_OID = 1082;
const parseDate = (value : any) => value;

types.setTypeParser(DATE_OID, parseDate);
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
    pool: { min: 0, max: 7 },
  },

  test: {
    client: 'pg',
    connection: process.env.DB || config.get('DB'),
    migrations: {
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
    pool: { min: 0, max: 7 },
  },

  production: {
    client: 'pg',
    connection: process.env.DB || config.get('DB'),
    migrations: {
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
    pool: { min: 0, max: 7 },
  },
};

export default knexConfig;
