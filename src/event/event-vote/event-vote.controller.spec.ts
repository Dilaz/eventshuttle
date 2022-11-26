import { Test, TestingModule } from '@nestjs/testing';
import { EventVoteController } from './event-vote.controller';
import { EventVoteService } from './event-vote.service';

describe('EventVoteController', () => {
  let controller: EventVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventVoteController],
      providers: [EventVoteService],
    }).compile();

    controller = module.get<EventVoteController>(EventVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
