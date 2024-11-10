"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphqlModuleOptions = void 0;
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("graphql");
const path = __importStar(require("path"));
const index_1 = require("../../plugins/common/dist/index");
const index_2 = require("../../plugins/plugin/dist/index");
/**
 *
 * @param configService
 * @param typesLoader
 * @param options
 * @returns
 */
async function createGraphqlModuleOptions(configService, typesLoader, options) {
    return {
        driver: apollo_1.ApolloDriver,
        path: `/${options.path}`,
        typeDefs: await createTypeDefs(configService, options, typesLoader),
        playground: options.playground || false,
        debug: options.debug || false,
        cors: {
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
            origin: '*',
            allowedHeaders: 'Authorization, Language, Tenant-Id, Organization-Id, X-Requested-With, X-Auth-Token, X-HTTP-Method-Override, Content-Type, Content-Language, Accept, Accept-Language, Observe'
        },
        include: [options.resolverModule]
    };
}
exports.createGraphqlModuleOptions = createGraphqlModuleOptions;
/**
 *
 * @param configService
 * @param options
 * @param typesLoader
 * @returns
 */
async function createTypeDefs(configService, options, typesLoader) {
    const normalizedPaths = options.typePaths.map((p) => p.split(path.sep).join('/'));
    const typeDefs = await typesLoader.mergeTypesByPaths(normalizedPaths);
    let schema = (0, graphql_1.buildSchema)(typeDefs);
    (0, index_2.getPluginExtensions)(configService.plugins)
        .map((e) => (typeof e.schema === 'function' ? e.schema() : e.schema))
        .filter(index_1.isNotEmpty)
        .forEach((documentNode) => (schema = (0, graphql_1.extendSchema)(schema, documentNode)));
    return (0, graphql_1.printSchema)(schema);
}
//# sourceMappingURL=graphql-helper.js.map