import { DataSource } from 'typeorm';
import { ApplicationPluginConfig } from '../../plugins/common/dist/index';
import { IMigrationOptions } from './migration-interface';
/**
 * @description
 * Run pending database migrations. See [TypeORM migration docs](https://typeorm.io/#/migrations)
 *
 * @param pluginConfig
 */
export declare function runDatabaseMigrations(pluginConfig: Partial<ApplicationPluginConfig>): Promise<void>;
/**
 * @description
 * Reverts last applied database migration. See [TypeORM migration docs](https://typeorm.io/#/migrations)
 *
 * @param pluginConfig
 */
export declare function revertLastDatabaseMigration(pluginConfig: Partial<ApplicationPluginConfig>): Promise<void>;
/**
 * @description
 * Generates a new migration file with sql needs to be executed to update schema.
 *
 * @param pluginConfig
 */
export declare function generateMigration(pluginConfig: Partial<ApplicationPluginConfig>, options: IMigrationOptions): Promise<void>;
/**
 * @description
 * Create a new blank migration file to be executed to create/update schema.
 *
 * @param pluginConfig
 */
export declare function createMigration(pluginConfig: Partial<ApplicationPluginConfig>, options: IMigrationOptions): Promise<void>;
/**
 * @description
 * Establish new database connection, if not found any connection. See [TypeORM migration docs](https://typeorm.io/#/connection)
 *
 * @param config
 */
export declare function establishDatabaseConnection(config: Partial<ApplicationPluginConfig>): Promise<DataSource>;
