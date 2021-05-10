import knex from 'knex';
import config from 'config';
import knexfile from '../knexfile.ts';

const env = process.env.NODE_ENV || config.get('NODE_ENV') || 'development';
const configOptions = knexfile[env];

export default knex(configOptions);
