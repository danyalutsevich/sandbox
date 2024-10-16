"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const index_1 = require("../../plugins/config/dist/index");
const graphql_helper_1 = require("./graphql-helper");
let GraphqlModule = exports.GraphqlModule = class GraphqlModule {
    /**
 * Register GraphQL module asynchronously.
 * @param optionsFactory Factory function to provide GraphQL configuration options.
 * @returns Dynamic module configuration.
 */
    static registerAsync(optionsFactory) {
        return graphql_1.GraphQLModule.forRootAsync({
            driver: apollo_1.ApolloDriver,
            useFactory: async (configService, typesLoader) => {
                return (0, graphql_helper_1.createGraphqlModuleOptions)(configService, typesLoader, optionsFactory(configService));
            },
            inject: [index_1.ConfigService, graphql_1.GraphQLTypesLoader],
            imports: []
        });
    }
};
exports.GraphqlModule = GraphqlModule = __decorate([
    (0, common_1.Module)({})
], GraphqlModule);
//# sourceMappingURL=graphql.module.js.map