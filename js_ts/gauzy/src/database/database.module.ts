import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule, ConfigService } from '../../plugins/config/dist/index';
import { ConnectionEntityManager } from './connection-entity-manager';

/**
 * Import and provide base typeorm related classes.
 *
 * @module
 */
@Global()
@Module({
  imports: [
    /**
     * Configuration for MikroORM database connection.
     *
     * @type {MikroORMModuleOptions}
     */
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Use useFactory, useClass, or useExisting
      useFactory: async (configService: ConfigService) => {
        const dbMikroOrmConnectionOptions = configService.config.dbMikroOrmConnectionOptions;
        return dbMikroOrmConnectionOptions;
      }
    }),
    /**
     * Configuration for TypeORM database connection.
     *
     * @type {TypeOrmModuleOptions}
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Use useFactory, useClass, or useExisting
      useFactory: async (configService: ConfigService) => {
        const dbConnectionOptions = configService.config.dbConnectionOptions as TypeOrmModuleOptions;
        return dbConnectionOptions;
      }
    }),
    /**
     * Configure the Knex.js module for the application using asynchronous options.
     */
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Use useFactory, useClass, or useExisting
      useFactory: async (configService: ConfigService) => {
        const dbKnexConnectionOptions = configService.config.dbKnexConnectionOptions;
        return dbKnexConnectionOptions;
      }
    })
  ],
  providers: [ConnectionEntityManager],
  exports: [TypeOrmModule, MikroOrmModule, ConnectionEntityManager]
})
export class DatabaseModule { }
