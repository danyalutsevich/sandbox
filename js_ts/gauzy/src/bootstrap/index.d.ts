/**
 * Start tracing using if OTEL is enabled.
 */
export declare function startTracing(): void;
import { INestApplication } from '@nestjs/common';
import { ApplicationPluginConfig } from '../../plugins/common/dist/index';
/**
 * Bootstrap the NestJS application, configuring various settings and initializing the server.
 *
 * @param pluginConfig - Optional plugin configuration.
 * @returns A promise that resolves to the initialized NestJS application.
 */
export declare function bootstrap(pluginConfig?: Partial<ApplicationPluginConfig>): Promise<INestApplication>;
/**
 * Registers a plugin configuration, applying pre-bootstrap operations to ensure it's ready for use.
 *
 * @param config - The partial application configuration to be pre-bootstrapped.
 * @returns A promise that resolves to the pre-bootstrapped application configuration.
 */
export declare function registerPluginConfig(config: Partial<ApplicationPluginConfig>): Promise<ApplicationPluginConfig>;
/**
 * Prepares the application configuration before initializing plugins.
 * Configures migration settings, registers entities and subscribers,
 * and applies additional plugin configurations.
 *
 * @param applicationConfig - The initial application configuration.
 * @returns A promise that resolves to the final application configuration after pre-bootstrap operations.
 */
export declare function preBootstrapApplicationConfig(applicationConfig: Partial<ApplicationPluginConfig>): Promise<ApplicationPluginConfig>;
/**
 * Gets the migrations directory and CLI migration paths.
 *
 * @returns An object containing paths for migrations and CLI migrations directory.
 */
export declare function getMigrationsSetting(): {
    migrations: string[];
    cli: {
        migrationsDir: string;
    };
};
