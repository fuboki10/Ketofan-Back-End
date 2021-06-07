import { Knex } from 'knex';

import Patient from '../../src/models/patient.model';

export async function up(knex: Knex): Promise<any> {
  return Patient.createTable(knex);
}

export async function down(knex: Knex): Promise<any> {
  return Patient.dropTable(knex);
}
