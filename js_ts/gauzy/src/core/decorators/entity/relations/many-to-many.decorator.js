"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMManyToMany = void 0;
const core_1 = require("@mikro-orm/core");
const underscore_1 = require("underscore");
const common_1 = require("../../../../../plugins/common");
const utils_1 = require("../../../../core/utils");
const object_utils_1 = require("../../../../core/util/object-utils");
const type_orm_1 = require("./type-orm");
const mikro_orm_1 = require("./mikro-orm");
/**
 * Decorator for defining Many-to-Many relationships in both TypeORM and MikroORM.
 *
 * @param typeFunctionOrTarget - Type or target function for the related entity.
 * @param inverseSide - Inverse side of the relationship or additional options.
 * @param options - Additional options for the Many-to-Many relationship.
 * @returns PropertyDecorator
 */
function MultiORMManyToMany(typeFunctionOrTarget, inverseSide, options) {
    // Normalize parameters.
    let inverseSideProperty;
    if (object_utils_1.ObjectUtils.isObject(inverseSide)) {
        options = inverseSide;
    }
    else {
        inverseSideProperty = inverseSide;
    }
    return (target, propertyKey) => {
        // If options are not provided, initialize an empty object
        if (!options)
            options = {};
        // Use TypeORM decorator for Many-to-Many
        (0, type_orm_1.TypeOrmManyToMany)(typeFunctionOrTarget, inverseSideProperty, options)(target, propertyKey);
        // Use MikroORM decorator for Many-to-Many
        (0, mikro_orm_1.MikroOrmManyToMany)(mapManyToManyArgsForMikroORM({ typeFunctionOrTarget, inverseSide: inverseSideProperty, options }))(target, propertyKey);
    };
}
exports.MultiORMManyToMany = MultiORMManyToMany;
/**
 * Maps Many-to-Many relationship options for MikroORM.
 *
 * @param typeFunctionOrTarget - Type or target function for the related entity.
 * @param inverseSide - Inverse side of the relationship.
 * @param options - Additional options for the Many-to-Many relationship.
 * @returns MikroORM-specific Many-to-Many relationship options.
 */
function mapManyToManyArgsForMikroORM({ typeFunctionOrTarget, inverseSide, options }) {
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
            mikroORMCascade = typeOrmOptions.cascade.map((c) => {
                switch (c) {
                    case 'insert':
                        return core_1.Cascade.PERSIST;
                    case 'update':
                        return core_1.Cascade.MERGE;
                    case 'remove':
                        return core_1.Cascade.REMOVE;
                    case 'soft-remove':
                    case 'recover':
                        return null;
                    default:
                        return null;
                }
            }).filter((c) => c);
        }
    }
    // Create MikroORM relation options
    const mikroOrmOptions = {
        ...(0, underscore_1.omit)(options, 'onDelete', 'onUpdate'),
        entity: typeFunctionOrTarget,
        cascade: mikroORMCascade,
        ...(typeOrmOptions?.nullable ? { nullable: typeOrmOptions?.nullable } : {}),
        ...(typeOrmOptions?.lazy ? { lazy: typeOrmOptions?.lazy } : {}),
    };
    // Map inverseSideOrOptions based on the DB_ORM environment variable
    if (process.env.DB_ORM == utils_1.MultiORMEnum.MikroORM) {
        if (mikroOrmOptions.owner === true) {
            mikroOrmOptions.inversedBy = inverseSide;
        }
        else {
            mikroOrmOptions.mappedBy = inverseSide;
        }
    }
    return mikroOrmOptions;
}
//# sourceMappingURL=many-to-many.decorator.js.map