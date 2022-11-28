import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { BaseModel } from 'src/common/entities/basemode.entity';
import { EventVote } from 'src/event/entities/event-vote.entity';
import { Event } from 'src/event/entities/event.entity';
import { EventDate } from 'src/event/entities/event_date.entity';

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
