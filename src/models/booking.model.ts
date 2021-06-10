/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'bookings';
export interface BookingInterface {
  id: number;
  day?: string;
  time: Date;
  workingDayId: number;
  available : boolean;
}

export interface CreateBookingProps {
  id?: number;
  time: string;
  workingDayId: number;
  available?: boolean;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.time('time').notNullable();
  table.integer('workingDayId').unsigned().notNullable().references('id')
    .inTable('working_days')
    .onDelete('CASCADE');
  table.boolean('available').defaultTo(true);
};

export const Booking = ModelBuilder.build({ tableName, schema });

export default Booking;
