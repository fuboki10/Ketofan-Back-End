/* eslint-disable import/extensions */
import knex from 'knex';
import knexfile from '../knexfile';
// eslint-disable-next-line import/order
import config = require('config');

const env : string = process.env.NODE_ENV || config.get('NODE_ENV');
const configOptions = knexfile[env];

export default knex(configOptions);
