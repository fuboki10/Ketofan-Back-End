/* eslint-disable import/extensions */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary();
  table.string('username', 50).unique();
  table.string('password');
};

const User = ModelBuilder.build('users', schema);

export default User;
