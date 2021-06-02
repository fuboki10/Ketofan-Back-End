import { Knex } from 'knex';

import Area from '../../src/models/area.model';

export async function up(knex: Knex): Promise<void> {
  return Area.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  return Area.dropTable(knex);
}
