import { DynamicModule } from '@nestjs/common';
/**
 * Import and provide seeder classes.
 *
 * @module
 */
export declare class SeederModule {
    /**
     * Creates a dynamic module configuration for SeederModule with plugin support.
     * @returns A dynamic module definition.
     */
    static forPlugins(): DynamicModule;
}
