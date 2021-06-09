/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface WorkingDayInterface {
  id: number;
  doctorId: number;
  type: string;
  day: string;
  from: Date;
  to: Date;
  duration?: number;
  slots?: number;
  working:boolean;
}

export interface CreateWorkingDayProps {
  id?: number;
  doctorId: number;
  type: string;
  day: string;
  from: Date;
  to: Date;
  duration?: number;
  slots?: number;
  working?:boolean;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('doctorId').unsigned().notNullable().references('id')
    .inTable('doctors')
    .onDelete('CASCADE');

  table.string('type', 20).notNullable().defaultTo('reservation');
  table.string('day', 20).notNullable();
  table.time('from').notNullable().defaultTo('00:00:00');
  table.time('to').notNullable().defaultTo('12:00:00');
  table.integer('duration').defaultTo(60); // duration in minutes
  table.integer('slots');
  table.boolean('working').notNullable().defaultTo(false);
};

export const WorkingDay = ModelBuilder.build('working_days', schema);

export default WorkingDay;
