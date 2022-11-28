import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { formatDate } from 'src/common/util';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventDate } from './entities/event_date.entity';
import * as _ from 'lodash';
import { VoteDateDto } from './dto/vote-event.dto';
import { EventVote } from './entities/event-vote.entity';
import { ResultsDto } from './dto/results.dto';
import { GetSingleEventDto } from './dto/event.dto';

@Injectable()
export class EventService {

  constructor(
    @Inject(Event) private readonly eventModel: typeof Event,
    @Inject(EventVote) private readonly eventVoteModel: typeof EventVote,
    @Inject(EventDate) private readonly eventDateModel: typeof EventDate,
  ) { }
  /**
   * Creates a new event
   * @param createEventDto
   * @returns
   */
  async create(createEventDto: CreateEventDto) {
    return _.pick(await this.eventModel.query()
      .returning('id')
      .insertGraph({
        name: createEventDto.name,
        dates: createEventDto.dates.map(date => ({ date: formatDate(new Date(date)), }) as EventDate),
      }), ['id']);
  }

  /**
   * Returns all events
   * @returns Event[]
   */
  async findAll(): Promise<Event[]> {
    return this.eventModel.query();
  }

  /**
   * Finds and returns event by ID
   * @param id Event ID
   * @returns Found event
   */
  async findOne(id: number): Promise<GetSingleEventDto> {
    const event = await this.eventModel.query().findById(id)
      .withGraphFetched('dates.votes');

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Return event in GetSingleEventDto format
    return {
      id: event.id,
      name: event.name,
      dates: event.dates.map(date => date.date),
      // Filter empty dates
      votes: event.dates.filter(date => date.votes.length)
      .map(date => ({
        date: date.date,
        people: date.votes.map(vote => vote.name),
      })),
    };
  }

  /**
   * Returns results for the vote
   * @param id ID 
   */
  async getResults(id: number): Promise<ResultsDto> {
    const event = await this.findOne(id);

    const allUsers = new Set<string>();

    // Go through the event dates and find all voters
    for (const vote of event.votes) {
      for (const name of vote.people) {
        allUsers.add(name);
      }
    }

    // Return dates with all the names listed
    return {
      id: event.id,
      name: event.name,
      // Filter out all dates with only partial list of attendees
      suitableDates: event.votes.filter(votes => votes.people.length === allUsers.size),
    };
  }

  /**
   * Votes an event
   * @param id Event ID
   * @param vote Voting info
   */
  async vote(id: number, vote: VoteDateDto): Promise<GetSingleEventDto> {
    // Find all matching dates
    const dates = await this.eventDateModel.query()
    .whereIn('date', vote.votes)
    .andWhere('eventId', id);

    // Add vote to each given date and ignore duplicate name errors
    await Promise.all(dates.map(date => this.eventVoteModel.query().insert({
      eventDateId: date.id,
      name: vote.name
    }).catch(e => console.error(e))));

    // Fetch the event with updated votes
    const event = await this.findOne(id);

    return event;
  }
}
