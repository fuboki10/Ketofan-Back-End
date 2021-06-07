/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.integer('doctorId').unsigned().notNullable().references('id')
    .inTable('doctors')
    .onDelete('CASCADE');

  table.integer('insuranceId').unsigned().notNullable().references('id')
    .inTable('insurances')
    .onDelete('CASCADE');

  table.primary(['doctorId', 'insuranceId']);
};

export const DoctorInsurances = ModelBuilder.build('doctor_insurances', schema);

export default DoctorInsurances;
