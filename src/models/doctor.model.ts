/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'doctors';
export interface DoctorInterface {
  id: number;
  userId: string;
  bio?: string;
  fees?: number;
}

export interface CreateDoctorProps {
  id?: number;
  userId: string;
  bio?: string;
  fees?: number;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('userId').unsigned().notNullable().references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .unique();
  table.text('bio');
  table.integer('fees').notNullable().defaultTo(200);
};

export const Doctor = ModelBuilder.build({ tableName, schema });

export default Doctor;
