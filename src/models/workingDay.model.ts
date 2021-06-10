/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'working_days';
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

  table.string('type', 20).defaultTo('reservation').notNullable();
  table.string('day', 20).notNullable();
  table.time('from').defaultTo('00:00:00').notNullable();
  table.time('to').defaultTo('12:00:00').notNullable();
  table.integer('duration').defaultTo(60); // duration in minutes
  table.integer('slots').defaultTo(12);
  table.boolean('working').notNullable().defaultTo(false);
};

export const WorkingDay = ModelBuilder.build({ tableName, schema });

export default WorkingDay;
