import { Knex } from 'knex';
// eslint-disable-next-line import/extensions
import User from '../../src/models/user.model';

export async function up(knex: Knex): Promise<any> {
  return User.createTable(knex);
}

export async function down(knex: Knex): Promise<any> {
  return User.dropTable(knex);
}
