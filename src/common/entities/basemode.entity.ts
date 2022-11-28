import { Model, snakeCaseMappers } from 'objection';
import * as _ from 'lodash';

export class BaseModel extends Model {
  protected createdAt: string;
  protected updatedAt: string;

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    json = _.omit(json, ['createdAt', 'updatedAt']);

    return json;
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
