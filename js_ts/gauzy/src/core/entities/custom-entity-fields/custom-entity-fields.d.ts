import { CustomEmbeddedFields } from "../../../../plugins/common";
/**
 * Defines the structure for entity field registration configuration.
 */
export type EntityFieldRegistrationConfig = {
    entityName: keyof CustomEmbeddedFields;
    customFields: any;
};
/**
 * Registrations for TypeORM custom entity fields.
 *
 * This array contains configurations for custom fields in TypeORM entities.
 * Each entry specifies the name of the entity and the associated custom fields.
 */
export declare const typeOrmCustomEntityFieldRegistrations: EntityFieldRegistrationConfig[];
/**
 * Registrations for MikroORM custom entity fields.
 *
 * This array contains the configurations for custom fields in MikroORM entities.
 * Each entry specifies the entity name and the corresponding custom fields.
 */
export declare const mikroOrmCustomEntityFieldRegistrations: EntityFieldRegistrationConfig[];
