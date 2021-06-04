import { Knex } from 'knex';
import { DoctorArea } from '../../src/models';

export async function up(knex: Knex): Promise<void> {
  await DoctorArea.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await DoctorArea.dropTable(knex);
}
