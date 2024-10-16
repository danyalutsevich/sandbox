import { HealthCheckService, TypeOrmHealthIndicator, DiskHealthIndicator, MikroOrmHealthIndicator } from '@nestjs/terminus';
import { CacheHealthIndicator } from './indicators/cache-health.indicator';
import { RedisHealthIndicator } from './indicators/redis-health.indicator';
import { DataSource } from 'typeorm';
import { TypeOrmUserRepository } from 'user/repository/type-orm-user.repository';
import { MikroOrmUserRepository } from 'user/repository/mikro-orm-user.repository';
export declare class HealthController {
    private readonly dataSource;
    private readonly health;
    private readonly typeOrmHealthIndicator;
    private readonly mikroOrmHealthIndicator;
    private readonly disk;
    private readonly cacheHealthIndicator;
    private readonly redisHealthIndicator;
    private readonly typeOrmUserRepository;
    private readonly mikroOrmUserRepository;
    constructor(dataSource: DataSource, health: HealthCheckService, typeOrmHealthIndicator: TypeOrmHealthIndicator, mikroOrmHealthIndicator: MikroOrmHealthIndicator, disk: DiskHealthIndicator, cacheHealthIndicator: CacheHealthIndicator, redisHealthIndicator: RedisHealthIndicator, typeOrmUserRepository: TypeOrmUserRepository, mikroOrmUserRepository: MikroOrmUserRepository);
    private readonly ormType;
    private readonly checkDb;
    private readonly checkStorage;
    private readonly checkCache;
    private readonly checkRedis;
    private readonly checkDbWithTerminus;
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
