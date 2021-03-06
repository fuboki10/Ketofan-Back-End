import { Knex } from 'knex';

import WorkingDay from '../../src/models/workingDay.model';

export async function up(knex: Knex): Promise<void> {
  await WorkingDay.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await WorkingDay.dropTable(knex);
}
