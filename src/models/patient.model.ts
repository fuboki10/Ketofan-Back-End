/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface PatientInterface {
  id: string;
  userId: string;
  name: string;
  birthDate?: Date;
  gender: string;
  profileImage?: string;
  phone?: string;
}

export interface CreatePatientProps {
  id?: string;
  userId: string;
  name: string;
  birthDate?: Date;
  gender: string;
  profileImage?: string;
  phone?: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.integer('userId').unsigned().notNullable().references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .unique();
  table.string('name').notNullable();
  table.date('birthDate');
  table.string('gender', 1).notNullable();
  table.string('profileImage');
  table.string('phone', 20).unique();
};

const Doctor = ModelBuilder.build('patients', schema);

export default Doctor;
