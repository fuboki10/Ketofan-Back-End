/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface AppointmentInterface {
  id: string;
  type: string;
  from: Date;
  to: Date;
  duration: number;
  slots: number;
}

export interface CreateAppointmentProps {
  id?: string;
  type: string;
  from: Date;
  to: Date;
  duration: number;
  slots: number;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('type', 20).notNullable();
  table.time('from').notNullable();
  table.time('to').notNullable();
  table.integer('duration').notNullable(); // duration in minutes
  table.integer('slots').notNullable();
};

export const Appointment = ModelBuilder.build('appointments', schema);

export default Appointment;
