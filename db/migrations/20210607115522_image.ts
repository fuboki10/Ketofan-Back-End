import { Knex } from 'knex';
import { Image } from '../../src/models';

export async function up(knex: Knex): Promise<void> {
  await Image.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await Image.dropTable(knex);
}
