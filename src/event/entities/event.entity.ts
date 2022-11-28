import { Model, snakeCaseMappers } from 'objection';
import { BaseModel } from '../../common/entities/basemode.entity';
import { EventDate } from './event_date.entity';

export class Event extends BaseModel {
  id: number;
  name: string;
  dates: EventDate[];

  static get tableName() {
    return 'events';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      dates: {
        relation: Model.HasManyRelation,
        modelClass: EventDate,
        join: {
          from: 'events.id',
          to: 'event_dates.event_id',
        },
      },
    };
  }
}
