import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Event } from './entities/event.entity';
import { EventVote } from './entities/event-vote.entity';
import { EventDate } from './entities/event_date.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    ObjectionModule.forFeature([Event, EventVote, EventDate]),
  ]
})
export class EventModule {}
