"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const nest_knexjs_1 = require("nest-knexjs");
const index_1 = require("../../plugins/config/dist/index");
const connection_entity_manager_1 = require("./connection-entity-manager");
/**
 * Import and provide base typeorm related classes.
 *
 * @module
 */
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            /**
             * Configuration for MikroORM database connection.
             *
             * @type {MikroORMModuleOptions}
             */
            nestjs_1.MikroOrmModule.forRootAsync({
                imports: [index_1.ConfigModule],
                inject: [index_1.ConfigService],
                // Use useFactory, useClass, or useExisting
                useFactory: async (configService) => {
                    const { dbMikroOrmConnectionOptions } = configService.config;
                    return dbMikroOrmConnectionOptions;
                }
            }),
            /**
             * Configuration for TypeORM database connection.
             *
             * @type {TypeOrmModuleOptions}
             */
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [index_1.ConfigModule],
                inject: [index_1.ConfigService],
                // Use useFactory, useClass, or useExisting
                useFactory: async (configService) => {
                    const { dbConnectionOptions } = configService.config;
                    return dbConnectionOptions;
                }
            }),
            /**
             * Configure the Knex.js module for the application using asynchronous options.
             */
            nest_knexjs_1.KnexModule.forRootAsync({
                imports: [index_1.ConfigModule],
                inject: [index_1.ConfigService],
                // Use useFactory, useClass, or useExisting
                useFactory: async (configService) => {
                    const { dbKnexConnectionOptions } = configService.config;
                    return dbKnexConnectionOptions;
                }
            })
        ],
        providers: [connection_entity_manager_1.ConnectionEntityManager],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, connection_entity_manager_1.ConnectionEntityManager]
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map