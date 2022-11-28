import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import database from 'config/database';

@Module({
  imports: [EventModule, HealthModule, DatabaseModule, ConfigModule.forRoot({
    load: [configuration, database],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
