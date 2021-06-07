import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.text('filename').unique().notNullable();
  table.text('filepath').notNullable();
  table.text('mimetype').notNullable();
  table.bigInteger('size').notNullable();
};

const Image = ModelBuilder.build('images', schema);

export default Image;
