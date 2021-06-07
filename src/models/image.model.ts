import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface ImageInterface {
  id: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();
  table.text('filename').unique().notNullable();
  table.text('filepath').notNullable();
  table.text('mimetype').notNullable();
  table.bigInteger('size').notNullable();
};

export const Image = ModelBuilder.build('images', schema);

export default Image;
