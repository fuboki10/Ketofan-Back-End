/* eslint-disable consistent-return */
import { Knex } from 'knex';
// eslint-disable-next-line import/extensions
import dbConn from '../../db';

/**
 * @interface
 * @author Abdelrahman Tarek
 */
export interface SchemaInterface {
  // eslint-disable-next-line no-unused-vars
  (table : Knex.CreateTableBuilder) : void
}

/**
 * @interface
 * @param {String} name
 * @author Abdelrahman Tarek
 */
export interface ModelProps {
  /**
   * Model Name
   * @type {String}
   */
  tableName: string;

  /**
   * Model Name
   * @type {SchemaInterface}
   */
  schema: SchemaInterface;

  /**
   * RAW query to execute After create
   * @type {String}
   */
  onCreate?: string;

  /**
   * RAW query to execute before drop
   * @type {String}
   */
  onDrop?: string;
}

/**
 * @class
 * @author Abdelrahman Tarek
 */
export default class Model {
  props : ModelProps;

  /**
   * @constructor
   * @author Abdelrahman Tarek
   * @param {ModelProps} props
   */
  constructor(props : ModelProps) {
    this.props = props;
  }

  get db() {
    return dbConn(this.props.tableName);
  }

  public find(filters : Object = {}) : Knex.QueryBuilder {
    return this.db
      .where(filters);
  }

  public findOne(filters : Object = {}) : Knex.QueryBuilder {
    return this.db
      .where(filters)
      .limit(1);
  }

  public findById(id : number) : Knex.QueryBuilder {
    return this.db
      .where('id', id);
  }

  public removeById(id : number) : Knex.QueryBuilder {
    return this.db
      .where('id', id)
      .del();
  }

  public dropTable(knex : Knex) : Promise<any> {
    const promises = [knex.schema.dropTableIfExists(this.props.tableName)];

    if (this.props.onDrop) promises.push(knex.schema.raw(this.props.onDrop));

    return Promise.all(promises);
  }

  public createTable(knex : Knex) : Promise<any> {
    return knex.schema.createTable(this.props.tableName, this.props.schema)
      .then(() => {
        if (this.props.onCreate) return knex.schema.raw(this.props.onCreate);
      });
  }
}
