/* eslint-disable import/extensions */
import Knex from 'knex';
import knexfile from '../knexfile';
import logger from '../src/utils/logger';

// eslint-disable-next-line import/order
import config = require('config');

/**
 * @author Abdelrahman Tarek
 * @async
 * @function
 * @summary Create database if not exists
 */
async function createDatabase() {
  const env = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';

  // get database connection configrations
  const configOptions = knexfile[env];

  // remove database name from connection string
  const dbName = configOptions.connection.slice(configOptions.connection.lastIndexOf('/') + 1);
  configOptions.connection = configOptions.connection.slice(0, configOptions.connection.lastIndexOf('/'));

  // get knex client
  const knex = Knex(configOptions);

  // check if database exists
  const databaseExists = await knex.raw(`SELECT EXISTS ( SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${dbName}') )`);

  if (!databaseExists?.rows[0]?.exists) {
    // if not exists create one
    await knex.raw('CREATE DATABASE ketofan');
    logger.info('CREATED KETOFAN DATABASE SUCCESSFULLY!!');
  }

  await knex.destroy();
}

createDatabase();
