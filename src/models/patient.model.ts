/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface PatientInterface {
  id: string;
  userId: string;
}

export interface CreatePatientProps {
  id?: string;
  userId: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('userId').unsigned().notNullable().references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .unique();
};

export const Patient = ModelBuilder.build('patients', schema);

export default Patient;
