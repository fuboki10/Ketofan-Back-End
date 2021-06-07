/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface SpecializationInterface {
  id: string;
  name: string;
  src?: string;
}

export interface CreateSpecializationProps {
  id?: string;
  name: string;
  src?: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('name').notNullable();
  table.text('src').notNullable();
};

export const Specialization = ModelBuilder.build('specializations', schema);

export default Specialization;
