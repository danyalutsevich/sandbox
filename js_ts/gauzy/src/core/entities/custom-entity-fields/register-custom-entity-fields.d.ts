import { ApplicationPluginConfig, RelationCustomEmbeddedFieldConfig } from '../../../../plugins/common';
/**
 * Registers a custom field for an entity based on the custom field configuration.
 *
 * @param customField - The custom field configuration.
 * @param name - The name of the custom field.
 * @param instance - The entity instance to which the field is being registered.
 */
export declare const registerFields: (customField: RelationCustomEmbeddedFieldConfig, name: string, instance: any) => Promise<void>;
/**
 * Registers custom fields for TypeORM entities based on a given configuration.
 *
 * @param config The configuration for the application plugins.
 * @throws Error if there's a failure during the registration process.
 */
export declare function registerTypeOrmCustomFields(config: ApplicationPluginConfig): Promise<void>;
/**
 * Registers custom fields for MikroORM entities based on a given configuration.
 *
 * @param config The configuration for the application plugins.
 * @throws Error if there's a failure during the registration process.
 */
export declare function registerMikroOrmCustomFields(config: ApplicationPluginConfig): Promise<void>;
