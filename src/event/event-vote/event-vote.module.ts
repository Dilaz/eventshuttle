import { Module } from '@nestjs/common';
import { EventVoteService } from './event-vote.service';
import { EventVoteController } from './event-vote.controller';

@Module({
  controllers: [EventVoteController],
  providers: [EventVoteService]
})
export class EventVoteModule {}
