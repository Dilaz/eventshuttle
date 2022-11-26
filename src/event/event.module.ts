import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventVoteModule } from './event-vote/event-vote.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [EventVoteModule]
})
export class EventModule {}
