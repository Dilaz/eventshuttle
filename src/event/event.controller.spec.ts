import { Test, TestingModule } from '@nestjs/testing';
import { fn } from 'objection';
import { VoteDateDto } from './dto/vote-event.dto';
import { EventController } from './event.controller';
import { EventService } from './event.service';

describe('EventController', () => {
  let controller: EventController;

  const mockEventService = {
    create: jest.fn(dto => {
      return {
        id: 1,
      }
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: 1,
          name: 'A super great birthday party',
        },
        {
          id: 2,
          name: 'Another event',
        },
      ];
    }),
    findOne: jest.fn((id: number) => {
      return {
        id,
        name: 'A super great birthday party',
        dates: ['2051-12-24', '2051-12-25', '2051-12-26'],
        votes: [
          {
            date: '2051-12-24',
            people: ['John', 'Julia', 'Paul', 'Daisy'],
          },
        ],
      };
    }),
    vote: jest.fn((id: number, vote: VoteDateDto) => {
      return mockEventService.findOne(id);
    }),
    getResults: jest.fn((id: number) => {
      return {
        id,
        name: 'A super great birthday party',
        suitableDates: [
          {
            date: '2051-12-24',
            people: ['John', 'Julia', 'Paul', 'Daisy'],
          },
        ],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    })
      .overrideProvider(EventService)
      .useValue(mockEventService)
      .compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an event', () => {
    expect(controller.create).toBeDefined();
    expect(controller.create({
      name: 'A super great birthday party',
      dates: ['2051-12-24', '2051-12-25', '2051-12-26'],
    })).toEqual({
      id: 1,
    });

    expect(mockEventService.create).toBeCalled();
  });

  it('should return list of all events', async () => {
    expect(await controller.findAll()).toEqual({
      events: [
        {
          id: 1,
          name: 'A super great birthday party',
        },
        {
          id: 2,
          name: 'Another event',
        },
      ]
    });
    expect(mockEventService.findAll).toBeCalled();
  });

  it('should find return an event', async () => {
    expect(controller.findOne).toBeDefined();
    expect(await controller.findOne(1)).toEqual({
      id: 1,
      name: 'A super great birthday party',
      dates: ['2051-12-24', '2051-12-25', '2051-12-26'],
      votes: [
        {
          date: '2051-12-24',
          people: ['John', 'Julia', 'Paul', 'Daisy'],
        },
      ],
    });
  });

  it('should save a vote', async () => {
    expect(controller.vote).toBeDefined();
    expect(await controller.vote(1, { name: 'John', votes: ['2051-12-24'] })).toEqual({
      id: 1,
      name: 'A super great birthday party',
      dates: ['2051-12-24', '2051-12-25', '2051-12-26'],
      votes: [
        {
          date: '2051-12-24',
          people: ['John', 'Julia', 'Paul', 'Daisy'],
        },
      ],
    });
  });

  it('should show results', async () => {
    expect(controller.results).toBeDefined();
    expect(await controller.results(1)).toEqual({
        id: 1,
        name: 'A super great birthday party',
        suitableDates: [
          {
            date: '2051-12-24',
            people: ['John', 'Julia', 'Paul', 'Daisy'],
          },
        ],
    });
  });
});
