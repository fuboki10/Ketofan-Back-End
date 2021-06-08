import { Knex } from 'knex';
import DoctorSpecialization from '../../src/models/doctorSpecialization.model';

export async function up(knex: Knex): Promise<void> {
  await DoctorSpecialization.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await DoctorSpecialization.dropTable(knex);
}
