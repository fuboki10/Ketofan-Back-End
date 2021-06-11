/* eslint-disable camelcase */
import { Knex } from 'knex';
import knex from '../../db';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'users';

const onCreate : string = `
ALTER TABLE ${tableName} ADD "name_tsvector" tsvector;

CREATE FUNCTION my_trigger_function()
RETURNS trigger AS $$
BEGIN
  NEW.name_tsvector := to_tsvector(NEW.name || ' ' || NEW.email);
  RETURN NEW;
END $$ LANGUAGE 'plpgsql';

CREATE TRIGGER insert_user_trigger
BEFORE INSERT ON ${tableName}
FOR EACH ROW
EXECUTE PROCEDURE my_trigger_function();

CREATE TRIGGER update_user_trigger
BEFORE UPDATE ON ${tableName}
FOR EACH ROW
WHEN (OLD.name IS DISTINCT FROM NEW.name)
EXECUTE PROCEDURE my_trigger_function();


CREATE INDEX idx_fts_user ON ${tableName} USING gin(name_tsvector);
`;

const onDrop : string = `
  DROP FUNCTION IF EXISTS my_trigger_function();
`;

export interface UserInterface {
  id: number;
  email: string;
  password?: string;
  role: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  verified: boolean;
  profileImage?: number;
  mobileNumber?: string;
  lastLogin: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserProps {
  id?: number;
  email: string;
  password: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  profileImage?: number;
  mobileNumber?: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  table.string('role', 50).notNullable();
  table.boolean('verified').notNullable().defaultTo(false);
  table.string('name').notNullable().index();
  table.date('dateOfBirth').notNullable();
  table.integer('profileImage').unsigned().defaultTo(8).references('id')
    .inTable('images');
  table.string('mobileNumber', 20).unique().notNullable();
  table.string('gender', 1).notNullable();
  table.timestamp('lastLogin').notNullable().defaultTo(knex.fn.now());
  table.timestamps(true, true);
};

export const User = ModelBuilder.build({
  tableName, schema, onCreate, onDrop,
});

export default User;
