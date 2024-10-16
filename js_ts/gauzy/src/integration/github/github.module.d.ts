import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class GithubModule implements NestModule {
    /**
     *
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer): void;
}
