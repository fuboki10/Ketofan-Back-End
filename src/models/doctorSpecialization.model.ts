/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.integer('doctorId').unsigned().notNullable().references('id')
    .inTable('doctors')
    .onDelete('CASCADE');

  table.integer('specializationId').unsigned().notNullable().references('id')
    .inTable('specializations')
    .onDelete('CASCADE');

  table.primary(['doctorId', 'specializationId']);
};

export const DoctorSpecialization = ModelBuilder.build('doctor_specializations', schema);

export default DoctorSpecialization;
