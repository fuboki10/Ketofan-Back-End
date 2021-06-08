/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface DoctorInterface {
  id: number;
  userId: string;
  bio?: string;
}

export interface CreateDoctorProps {
  id?: number;
  userId: string;
  bio?: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('userId').unsigned().notNullable().references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .unique();
  table.text('bio');
};

export const Doctor = ModelBuilder.build('doctors', schema);

export default Doctor;
