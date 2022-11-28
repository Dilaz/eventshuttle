import { HttpModule } from '@nestjs/axios';
import { HttpHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PrimaryDatabaseHealthIndicator } from './db.health-indicator';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  jest.mock('knex');

  const mockDbIndicator = {
    ping: jest.fn(() => ({
      database: {
        status: 'up',
      },
    })),
  };

  const mockHttpIndicator = {
    pingCheck: jest.fn((name) => ({
      [name]: {
        status: 'up',
      },
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      providers: [PrimaryDatabaseHealthIndicator],
      controllers: [HealthController],
    })
      .overrideProvider(PrimaryDatabaseHealthIndicator)
      .useValue(mockDbIndicator)
      .overrideProvider(HttpHealthIndicator)
      .useValue(mockHttpIndicator)
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have ok status', async () => {
    expect(await controller.check()).toEqual(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(mockDbIndicator.ping).toBeCalled();
  });
});
