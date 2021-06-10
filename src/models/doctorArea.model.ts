/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const tableName = 'doctor_areas';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.integer('doctorId').unsigned().notNullable().references('id')
    .inTable('doctors')
    .onDelete('CASCADE');

  table.integer('areaId').unsigned().notNullable().references('id')
    .inTable('areas')
    .onDelete('CASCADE');

  table.primary(['doctorId', 'areaId']);
};

export const DoctorArea = ModelBuilder.build({ tableName, schema });

export default DoctorArea;
