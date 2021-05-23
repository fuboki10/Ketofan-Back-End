/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface DoctorInterface {
  id: string;
  userId: string;
  bio?: string;
  profileImage?: string;
  phone?: string;
}

export interface CreateDoctorProps {
  id?: string;
  userId: string;
  bio?: string;
  profileImage?: string;
  phone?: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('userId').unsigned().notNullable().references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .unique();
  table.text('bio');
  table.string('profileImage');
  table.string('phone', 20).unique();
};

const Doctor = ModelBuilder.build('doctors', schema);

export default Doctor;
