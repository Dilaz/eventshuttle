import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { EventVote } from '../event/entities/event-vote.entity';
import { Event } from '../event/entities/event.entity';
import { EventDate } from '../event/entities/event_date.entity';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          config: {
            ...config.get<Knex.Config>('database'),
            ...knexSnakeCaseMappers(),
            useNullAsDefault: true,
            debug: config.get<string>('env') === 'development',
          },
        };
      },
    }),

    //Register your objection models so it can be provided when needed.
    ObjectionModule.forFeature([Event, EventDate, EventVote]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
