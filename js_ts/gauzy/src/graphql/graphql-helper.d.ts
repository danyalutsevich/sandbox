import { GqlModuleOptions, GraphQLTypesLoader } from '@nestjs/graphql';
import { GraphQLApiConfigurationOptions } from '../../plugins/common/dist/index';
import { ConfigService } from '../../plugins/config/dist/index';
/**
 *
 * @param configService
 * @param typesLoader
 * @param options
 * @returns
 */
export declare function createGraphqlModuleOptions(configService: ConfigService, typesLoader: GraphQLTypesLoader, options: GraphQLApiConfigurationOptions): Promise<GqlModuleOptions>;
