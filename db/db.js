const knex = require('knex');

const knexfile = require('../knexfile');

const config = require('config');

const env = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);
