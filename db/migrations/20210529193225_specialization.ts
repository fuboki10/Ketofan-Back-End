import { Knex } from 'knex';

import Specialization from '../../src/models/specialization.model';

export async function up(knex: Knex): Promise<void> {
  return Specialization.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  return Specialization.dropTable(knex);
}
