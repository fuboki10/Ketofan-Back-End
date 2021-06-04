/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface DoctorRequestInterface {
  id: string;
  email: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  specializationId: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDoctorRequestProps {
  id?: string;
  email: string;
  password: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  specializationId: number;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.string('name').notNullable();
  table.string('email').unique().notNullable();
  table.string('gender', 1).notNullable();
  table.date('dateOfBirth').notNullable();
  table.integer('specializationId').unsigned().notNullable().references('id')
    .inTable('specializations')
    .onDelete('CASCADE');

  table.timestamps(true, true);
};

const DoctorRequest = ModelBuilder.build('doctor_requests', schema);

export default DoctorRequest;