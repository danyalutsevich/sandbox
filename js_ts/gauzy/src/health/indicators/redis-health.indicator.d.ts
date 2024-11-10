import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
export declare class RedisHealthIndicator extends HealthIndicator {
    private _client;
    /**
     *
     */
    constructor();
    isHealthy(key: string): Promise<HealthIndicatorResult>;
    private startRedis;
    private stopRedis;
    private checkRedis;
}
