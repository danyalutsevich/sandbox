import { DynamicModule } from '@nestjs/common';
import { GraphQLApiConfigurationOptions } from '../../plugins/common/dist/index';
import { ConfigService } from '../../plugins/config/dist/index';
export declare class GraphqlModule {
    /**
 * Register GraphQL module asynchronously.
 * @param optionsFactory Factory function to provide GraphQL configuration options.
 * @returns Dynamic module configuration.
 */
    static registerAsync(optionsFactory: (configService: ConfigService) => GraphQLApiConfigurationOptions): DynamicModule;
}
