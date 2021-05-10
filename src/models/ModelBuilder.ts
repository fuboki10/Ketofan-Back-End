// eslint-disable-next-line import/extensions
import Model, { SchemaInterface } from './Model';

export default class ModelBuilder {
  // eslint-disable-next-line no-unused-vars
  static build(name : string, schema : SchemaInterface) {
    return new Model({ name, schema });
  }
}
