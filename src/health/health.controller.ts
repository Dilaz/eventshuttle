import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { PrimaryDatabaseHealthIndicator } from './db.health-indicator';

@Controller('health')
@ApiTags('Health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private memory: MemoryHealthIndicator,
        private db: PrimaryDatabaseHealthIndicator,
      ) {}

      @Get()
      @HealthCheck()
      check() {
        return this.health.check([
          () => this.http.pingCheck('google', 'https://google.com'),
          () => this.http.pingCheck('yle.fi', 'https://yle.fi'),
          () => this.db.ping('database'),
          () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
        ]);
      }
}
