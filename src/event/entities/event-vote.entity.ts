import { Model, snakeCaseMappers } from 'objection';

export class EventVote extends Model {
  id: number;

  static get tableName() {
    return 'event_votes';
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
