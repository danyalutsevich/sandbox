"use strict";
// Copyright (c) 2019-2020 Ever Co. LTD
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// Originally MIT Licensed
// - see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// - original code `Copyright (c) 2018 Sumanth Chinthagunta`;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const index_1 = require("../../plugins/config/dist/index");
const context_1 = require("./context");
const file_storage_1 = require("./file-storage");
const graphql_module_1 = require("../graphql/graphql.module");
const graphql_api_module_1 = require("../graphql/graphql-api.module");
const database_module_1 = require("../database/database.module");
let CoreModule = exports.CoreModule = class CoreModule {
    configure(consumer) {
        consumer.apply(context_1.RequestContextMiddleware).forRoutes('*');
    }
};
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            graphql_api_module_1.GraphqlApiModule,
            graphql_module_1.GraphqlModule.registerAsync((configService) => ({
                path: configService.graphqlConfigOptions.path,
                playground: configService.graphqlConfigOptions.playground,
                debug: configService.graphqlConfigOptions.debug,
                cors: {
                    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                    credentials: true,
                    origin: '*',
                    allowedHeaders: 'Authorization, Language, Tenant-Id, Organization-Id, X-Requested-With, X-Auth-Token, X-HTTP-Method-Override, Content-Type, Content-Language, Accept, Accept-Language, Observe'
                },
                typePaths: [
                    index_1.environment.isElectron
                        ? path.join(path.resolve(__dirname, '../../../../../../data/'), '*.gql')
                        : path.join(path.resolve(__dirname, '../**/', 'schema'), '*.gql')
                ],
                resolverModule: graphql_api_module_1.GraphqlApiModule
            })),
            file_storage_1.FileStorageModule
        ],
        controllers: [],
        providers: []
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map