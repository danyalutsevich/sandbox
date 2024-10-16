"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMikroOrmCustomFields = exports.registerTypeOrmCustomFields = exports.registerFields = void 0;
const typeorm_1 = require("typeorm");
const decorators_1 = require("../../../core/decorators");
const custom_entity_fields_1 = require("./custom-entity-fields");
const mikro_orm_base_custom_entity_field_1 = require("./mikro-orm-base-custom-entity-field");
/**
 * Registers a custom field for an entity based on the custom field configuration.
 *
 * @param customField - The custom field configuration.
 * @param name - The name of the custom field.
 * @param instance - The entity instance to which the field is being registered.
 */
const registerFields = async (customField, name, instance) => {
    if (customField.type === 'relation') {
        if (customField.relationType === 'many-to-many') {
            // Register Many-to-Many relation with additional options
            const relationOptions = {
                ...(customField.pivotTable && { pivotTable: customField.pivotTable }),
                ...(customField.joinColumn && { joinColumn: customField.joinColumn }),
                ...(customField.inverseJoinColumn && { inverseJoinColumn: customField.inverseJoinColumn })
            };
            // Register a Many-to-Many relation
            (0, decorators_1.MultiORMManyToMany)(() => customField.entity, customField.inverseSide, relationOptions)(instance, name);
            (0, typeorm_1.JoinTable)({ name: customField.pivotTable })(instance, name);
        }
        else if (customField.relationType === 'many-to-one') {
            // Register a Many-to-One relation
            (0, decorators_1.MultiORMManyToOne)(() => customField.entity, customField.inverseSide)(instance, name);
            (0, typeorm_1.JoinColumn)()(instance, name);
        }
    }
    else {
        // Register a custom column
        const { nullable, unique } = customField.options;
        const options = {
            name,
            nullable: nullable === false ? false : true,
            unique: unique ?? false
        };
        (0, decorators_1.MultiORMColumn)(options)(instance, name);
    }
};
exports.registerFields = registerFields;
/**
 * Registers custom fields for a specific entity in the provided application configuration.
 *
 * @param config - The application configuration.
 * @param entityName - The name of the entity for which custom fields are registered.
 * @param ctor - The constructor function for the custom fields.
 */
async function registerCustomFieldsForEntity(config, entityName, ctor) {
    // Get the list of custom fields for the specified entity, defaulting to an empty array if none are found
    const customFields = config.customFields?.[entityName] ?? [];
    // Create a single instance of the constructor
    const instance = new ctor();
    // Register each custom field
    await Promise.all(customFields.map(async (customField) => {
        const { propertyPath } = customField; // Destructure to get property path
        await (0, exports.registerFields)(customField, propertyPath, instance); // Register the custom column
    }));
    /**
     * If there are only relations are defined for an Entity for customFields, then TypeORM not saving realtions for entity ("Cannot set properties of undefined (<fieldName>)").
     * So we have to add a "fake" column to the customFields embedded type to prevent this error from occurring.
     */
    if (customFields.length > 0) {
        (0, decorators_1.MultiORMColumn)({
            type: 'boolean',
            nullable: true,
            select: false // This ensures the property is not selected by default
        })(instance, mikro_orm_base_custom_entity_field_1.__FIX_RELATIONAL_CUSTOM_FIELDS__);
    }
}
/**
 * Registers custom fields for TypeORM entities based on a given configuration.
 *
 * @param config The configuration for the application plugins.
 * @throws Error if there's a failure during the registration process.
 */
async function registerTypeOrmCustomFields(config) {
    try {
        // Loop through the custom field registrations and register each for the corresponding entity
        for (const registration of custom_entity_fields_1.typeOrmCustomEntityFieldRegistrations) {
            await registerCustomFieldsForEntity(config, registration.entityName, registration.customFields);
        }
    }
    catch (error) {
        console.error('Error registering custom entity fields:', error);
        throw new Error('Failed to register custom entity fields');
    }
}
exports.registerTypeOrmCustomFields = registerTypeOrmCustomFields;
/**
 * Registers custom fields for MikroORM entities based on a given configuration.
 *
 * @param config The configuration for the application plugins.
 * @throws Error if there's a failure during the registration process.
 */
async function registerMikroOrmCustomFields(config) {
    try {
        // Loop through the custom field registrations for MikroORM
        for (const registration of custom_entity_fields_1.mikroOrmCustomEntityFieldRegistrations) {
            await registerCustomFieldsForEntity(config, registration.entityName, registration.customFields);
        }
    }
    catch (error) {
        console.error('Error registering custom entity fields for MikroORM:', error);
        throw new Error('Failed to register custom entity fields for MikroORM');
    }
}
exports.registerMikroOrmCustomFields = registerMikroOrmCustomFields;
//# sourceMappingURL=register-custom-entity-fields.js.map