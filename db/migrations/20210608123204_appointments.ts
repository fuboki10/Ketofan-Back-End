import { Knex } from 'knex';
import Appointment from '../../src/models/appointment.model';

export async function up(knex: Knex): Promise<void> {
  await Appointment.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await Appointment.dropTable(knex);
}
