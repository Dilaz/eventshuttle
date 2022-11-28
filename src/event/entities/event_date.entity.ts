import { Model, QueryContext, snakeCaseMappers } from 'objection';
import { formatDate } from '../../common/util';
import { EventVote } from './event-vote.entity';

export class EventDate extends Model {
  id: number;
  date: string;

  votes: EventVote[];

  static get tableName() {
    return 'event_dates';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['date'],

      properties: {
        id: { type: 'integer' },
        date: { type: 'string' },
      },
    };
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $afterFind(queryContext: QueryContext): void {
    this.date = formatDate(new Date(this.date));
  }

  static get relationMappings() {
    const Event = require('./event.entity');
    return {
      events: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'event_dates.eventId',
          to: 'event.id',
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: EventVote,
        join: {
          from: 'event_dates.id',
          to: 'event_votes.eventDateId',
        },
      },
    };
  }
}
