import { Model, snakeCaseMappers } from 'objection';
import { EventVote } from '../event-vote/entities/event-vote.entity';

export class EventDate extends Model {
  id: number;
  date: string;

  votes: EventVote[];

  static get tableName() {
    return 'event_dates';
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
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'events.id',
          to: 'event_dates.event_id',
        }
        },
        votes: {
            relation: Model.HasManyRelation,
            modelClass: EventVote,
            join: {
                from: 'event_dates.id',
                to: 'event_votes.eventDateId',
            }
        }
    };
}
