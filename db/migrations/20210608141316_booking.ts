import { Knex } from 'knex';
import Booking from '../../src/models/booking.model';

export async function up(knex: Knex): Promise<void> {
  await Booking.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  await Booking.dropTable(knex);
}
