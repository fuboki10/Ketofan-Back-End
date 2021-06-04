import { Knex } from 'knex';
import { DoctorInsurance } from '../../src/models';

export async function up(knex: Knex): Promise<void> {
  await DoctorInsurance.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await DoctorInsurance.dropTable(knex);
}
