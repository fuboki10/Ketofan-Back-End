import { Knex } from 'knex';

import Doctor from '../../src/models/doctor.model';

export async function up(knex: Knex): Promise<void> {
  return Doctor.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  return Doctor.dropTable(knex);
}
