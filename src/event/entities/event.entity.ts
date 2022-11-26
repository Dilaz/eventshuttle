import { Model, snakeCaseMappers } from 'objection';
import { EventDate } from './event_date.entity';

export class Event extends Model {
  id: number;

  name: string;

  dates: EventDate[];

  static get tableName() {
    return 'events';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },

                dates: { type: 'date', },
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
        }
      }
    };
}
