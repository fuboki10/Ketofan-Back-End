/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'appointments';
export interface AppointmentInterface {
  id?: number;
  bookingId: number;
  patientId: number;
  doctorId: number;
  date: Date;
}

export interface CreateAppointmentProps {
  id?: number;
  bookingId: number;
  patientId: number;
  doctorId: number;
  date?: Date;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('bookingId').unsigned().notNullable().references('id')
    .inTable('bookings')
    .onDelete('CASCADE');
  table.integer('patientId').unsigned().notNullable().references('id')
    .inTable('patients')
    .onDelete('CASCADE');
  table.integer('doctorId').unsigned().notNullable().references('id')
    .inTable('doctors')
    .onDelete('CASCADE')
    .index();
  table.date('date').notNullable();
};

export const Appointment = ModelBuilder.build({ tableName, schema });

export default Appointment;
