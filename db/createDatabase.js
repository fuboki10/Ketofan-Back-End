const knex = require('knex');

const config = require('config');
const knexfile = require('../knexfile');
const logger = require('../src/utils/logger');

async function createDatabase() {
  const env = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';
  const configOptions = knexfile[env];

  configOptions.connection = configOptions.connection.slice(0, configOptions.connection.lastIndexOf('/'));

  knex(configOptions);

  await knex.raw('CREATE DATABASE ketofan');
  await knex.destroy();

  logger.info('CREATED KETOFAN DATABASE SUCCESSFULLY!!');
}

createDatabase();
