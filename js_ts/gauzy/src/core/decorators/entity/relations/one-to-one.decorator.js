"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOneToOneArgsForMikroORM = exports.MultiORMOneToOne = void 0;
const core_1 = require("@mikro-orm/core");
const underscore_1 = require("underscore");
const common_1 = require("../../../../../plugins/common");
const utils_1 = require("../../../../core/utils");
const object_utils_1 = require("../../../../core/util/object-utils");
const type_orm_1 = require("./type-orm");
const mikro_orm_1 = require("./mikro-orm");
/**
 * Decorator for defining One-to-One relationships in both TypeORM and MikroORM.
 *
 * @param typeFunctionOrTarget - Type or target function for the related entity.
 * @param inverseSideOrOptions - Inverse side of the relationship or additional options.
 * @param options - Additional options for the One-to-One relationship.
 * @returns PropertyDecorator
 */
function MultiORMOneToOne(typeFunctionOrTarget, inverseSideOrOptions, options) {
    // Normalize parameters.
    let inverseSideProperty;
    if (object_utils_1.ObjectUtils.isObject(inverseSideOrOptions)) {
        options = inverseSideOrOptions;
    }
    else {
        inverseSideProperty = inverseSideOrOptions;
    }
    return (target, propertyKey) => {
        // If options are not provided, initialize an empty object
        if (!options)
            options = {};
        // Use TypeORM decorator for One-to-One
        (0, type_orm_1.TypeOrmOneToOne)(typeFunctionOrTarget, inverseSideOrOptions, options)(target, propertyKey);
        // Use MikroORM decorator for One-to-One
        (0, mikro_orm_1.MikroOrmOneToOne)(mapOneToOneArgsForMikroORM({ typeFunctionOrTarget, inverseSideOrOptions: inverseSideProperty, options, propertyKey }))(target, propertyKey);
    };
}
exports.MultiORMOneToOne = MultiORMOneToOne;
/**
 * Maps TypeORM OneToOne relation options to MikroORM options for MikroORM integration with TypeORM.
 *
 * @param param0 - Destructured parameters object.
 * @returns MikroORMRelationOptions - The mapped MikroORM relation options.
 */
function mapOneToOneArgsForMikroORM({ typeFunctionOrTarget, inverseSideOrOptions, options, propertyKey }) {
    // Cast options to RelationOptions
    const typeOrmOptions = (0, common_1.deepClone)(options);
    // Initialize an array to store MikroORM cascade options
    let mikroORMCascade = [];
    // Check if TypeORM cascade options are provided
    if (typeOrmOptions?.cascade) {
        // Handle boolean cascade option
        if (typeof typeOrmOptions.cascade === 'boolean') {
            mikroORMCascade = typeOrmOptions.cascade ? [core_1.Cascade.ALL] : [];
        }
        // Handle array cascade options
        if (typeOrmOptions?.cascade instanceof Array) {
            // Define a mapping from TypeORM cascade options to MikroORM cascade options
            const cascading = {
                'insert': core_1.Cascade.PERSIST,
                'update': core_1.Cascade.MERGE,
                'remove': core_1.Cascade.REMOVE,
                'soft-remove': null,
                'recover': null,
            };
            mikroORMCascade = typeOrmOptions.cascade.map((c) => cascading[c] || null).filter(Boolean);
        }
    }
    // Create MikroORM relation options
    const mikroOrmOptions = {
        ...(0, underscore_1.omit)(options, 'onDelete', 'onUpdate'),
        entity: typeFunctionOrTarget,
        ...(mikroORMCascade.length ? { cascade: mikroORMCascade } : {}),
        ...(typeOrmOptions?.onDelete ? { deleteRule: typeOrmOptions?.onDelete?.toLocaleLowerCase() } : {}),
        ...(typeOrmOptions?.onUpdate ? { updateRule: typeOrmOptions?.onUpdate?.toLocaleLowerCase() } : {}),
    };
    // Set default joinColumn if not overwritten in options
    if (mikroOrmOptions.owner === true && !mikroOrmOptions.joinColumn && propertyKey) {
        mikroOrmOptions.joinColumn = `${propertyKey}Id`;
        mikroOrmOptions.referenceColumnName = `id`;
    }
    // Map inverseSideOrOptions based on the DB_ORM environment variable
    if (process.env.DB_ORM === utils_1.MultiORMEnum.MikroORM && !mikroOrmOptions.owner) {
        mikroOrmOptions.mappedBy = inverseSideOrOptions;
    }
    return mikroOrmOptions;
}
exports.mapOneToOneArgsForMikroORM = mapOneToOneArgsForMikroORM;
//# sourceMappingURL=one-to-one.decorator.js.map