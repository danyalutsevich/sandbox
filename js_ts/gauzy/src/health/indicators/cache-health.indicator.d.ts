import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Cache } from 'cache-manager';
export declare class CacheHealthIndicator extends HealthIndicator {
    private cacheManager;
    constructor(cacheManager: Cache);
    isHealthy(key: string): Promise<HealthIndicatorResult>;
}
