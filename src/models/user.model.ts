/* eslint-disable camelcase */
import { Knex } from 'knex';
import knex from '../../db';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface UserInterface {
  id: string;
  email: string;
  password?: string;
  role: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  verified: boolean;
  lastLogin: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserProps {
  id?: string;
  email: string;
  password: string;
  name: string;
  gender: string;
  dateOfBirth: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  table.string('role', 50).notNullable();
  table.boolean('verified').notNullable().defaultTo(false);
  table.string('name').notNullable().index();
  table.date('dateOfBirth').notNullable();
  table.string('gender', 1).notNullable();
  table.timestamp('lastLogin').notNullable().defaultTo(knex.fn.now());
  table.timestamps(true, true);
};

const User = ModelBuilder.build('users', schema);

export default User;
