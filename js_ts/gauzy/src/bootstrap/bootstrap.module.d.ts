import { MiddlewareConsumer, NestModule, OnApplicationShutdown } from '@nestjs/common';
export declare class BootstrapModule implements NestModule, OnApplicationShutdown {
    constructor();
    /**
     *
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer): void;
    /**
     *
     * @param signal
     */
    onApplicationShutdown(signal: string): Promise<void>;
}
