import { Knex } from 'knex';
import DoctorRequest from '../../src/models/doctorRequest.model';

export async function up(knex: Knex): Promise<void> {
  await DoctorRequest.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await DoctorRequest.dropTable(knex);
}
