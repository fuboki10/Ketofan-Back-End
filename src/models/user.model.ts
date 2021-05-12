/* eslint-disable import/extensions */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password?: string;
}

export interface CreateUserProps {
  id?: string;
  username: string;
  email: string;
  password: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('username', 50).unique().notNullable();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
};

const User = ModelBuilder.build('users', schema);

export default User;
