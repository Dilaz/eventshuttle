import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '../database/database.module';
import { PrimaryDatabaseHealthIndicator } from './db.health-indicator';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, HttpModule, DatabaseModule],
  controllers: [HealthController],
  providers: [PrimaryDatabaseHealthIndicator],
})
export class HealthModule {}
