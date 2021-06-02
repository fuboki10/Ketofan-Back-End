import { Knex } from 'knex';
import { Insurance } from '../../src/models';

export async function up(knex: Knex): Promise<void> {
  await Insurance.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await Insurance.dropTable(knex);
}
