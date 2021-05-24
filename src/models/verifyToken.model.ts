/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.integer('userId').unsigned().notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');

  table.string('token', 50).notNullable();

  table.timestamps(true, true);

  table.primary(['userId', 'token']);
};

const VerifyToken = ModelBuilder.build('verifyTokens', schema);

export default VerifyToken;
