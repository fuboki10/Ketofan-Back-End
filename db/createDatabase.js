const knex = require('knex');
const config = require('../knexfile');
const logger = require('../src/utils/logger');

async function createDatabase() {
  config.connection.database = null;
  knex(config);

  await knex.raw('CREATE DATABASE ketofan');
  await knex.destroy();

  logger.info('CREATED KETOFAN DATABASE SUCCESSFULLY!!');
}

createDatabase();
