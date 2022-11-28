import { Model } from 'objection';
import { BaseModel } from '../../common/entities/basemode.entity';
import { EventDate } from './event_date.entity';

export class EventVote extends BaseModel {
  id: number;
  name: string;
  eventDateId: number;

  static get tableName() {
    return 'event_votes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        eventDateId: { type: 'number' },
      },
    };
  }

  static get relationMappings() {
    return {
      dates: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventDate,
        join: {
          from: 'event_votes.event_date_id',
          to: 'event_dates.id',
        },
      },
    };
  }
}
