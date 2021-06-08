/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface AppointmentInterface {
  id: string;
  time: Date;
  workingDayId: number;
}

export interface CreateAppointmentProps {
  id?: string;
  time: Date;
  workingDayId: number;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.time('time').notNullable();
  table.integer('workingDayId').unsigned().notNullable().references('id')
    .inTable('working_days')
    .onDelete('CASCADE');
};

export const Appointment = ModelBuilder.build('appointments', schema);

export default Appointment;
