/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface WorkingDayInterface {
  id: string;
  type: string;
  day: string;
  from: Date;
  to: Date;
  duration?: number;
  slots?: number;
}

export interface CreateWorkingDayProps {
  id?: string;
  type: string;
  day: string;
  from: Date;
  to: Date;
  duration?: number;
  slots?: number;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('doctorId').unsigned().notNullable().references('id')
    .inTable('doctors')
    .onDelete('CASCADE');

  table.string('type', 20).notNullable();
  table.string('day', 20).notNullable();
  table.time('from').notNullable();
  table.time('to').notNullable();
  table.integer('duration'); // duration in minutes
  table.integer('slots');

  table.unique(['doctorId', 'day']);
};

export const WorkingDay = ModelBuilder.build('Working_days', schema);

export default WorkingDay;
