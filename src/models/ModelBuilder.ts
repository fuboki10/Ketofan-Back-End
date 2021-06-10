// eslint-disable-next-line import/extensions
import Model, { ModelProps } from './Model';

export default class ModelBuilder {
  // eslint-disable-next-line no-unused-vars
  static build(props: ModelProps) {
    return new Model(props);
  }
}
