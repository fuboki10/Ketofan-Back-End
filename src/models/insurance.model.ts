/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'insurances';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('name').notNullable();
};

export const Insurance = ModelBuilder.build({ tableName, schema });

export default Insurance;
