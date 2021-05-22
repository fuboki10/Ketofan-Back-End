/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  verified?: boolean;
  lastLogin?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserProps {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('username', 50).unique().notNullable();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  table.string('role', 50).notNullable();
  table.boolean('verified').notNullable().defaultTo(false);
  table.date('lastLogin');
  table.timestamps(true, true);
};

const User = ModelBuilder.build('users', schema);

export default User;
