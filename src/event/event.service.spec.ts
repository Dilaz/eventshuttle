import { Test, TestingModule } from '@nestjs/testing';
import { EventVote } from './entities/event-vote.entity';
import { EventDate } from './entities/event_date.entity';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';

describe('EventService', () => {
  let service: EventService;

  const mockEventModel = {
    id: 1,
    query: jest
      .fn()
      .mockImplementation((dto) => ({ ...mockEventModel, ...dto })),
    returning: jest
      .fn()
      .mockImplementation((dto) => ({ ...mockEventModel, ...dto })),
    insertGraph: jest
      .fn()
      .mockImplementation((dto) => ({ ...mockEventModel, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: Event,
          useValue: mockEventModel,
        },
        {
          provide: EventVote,
          useValue: {},
        },
        {
          provide: EventDate,
          useValue: {},
        },
      ],
      imports: [ObjectionModule.forFeature([Event, EventVote, EventDate])],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new event and return the id', async () => {
    expect(
      await service.create({
        name: 'A super great birthday party',
        dates: ['2051-12-24', '2051-12-25', '2051-12-26'],
      }),
    ).toEqual({
      id: expect.any(Number),
    });
  });
});
