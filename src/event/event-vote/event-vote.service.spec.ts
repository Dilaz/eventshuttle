import { Test, TestingModule } from '@nestjs/testing';
import { EventVoteService } from './event-vote.service';

describe('EventVoteService', () => {
  let service: EventVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventVoteService],
    }).compile();

    service = module.get<EventVoteService>(EventVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
