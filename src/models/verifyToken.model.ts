/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'verify_tokens';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('userId').unsigned().notNullable().unique()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');

  table.string('token').unique().notNullable();

  table.timestamps(true, true);
};

export const VerifyToken = ModelBuilder.build({ tableName, schema });

export default VerifyToken;
