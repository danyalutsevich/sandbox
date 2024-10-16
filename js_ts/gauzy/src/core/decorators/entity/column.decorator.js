"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMColumn = void 0;
const core_1 = require("@mikro-orm/core");
const typeorm_1 = require("typeorm");
const object_utils_1 = require("../../../core/util/object-utils");
const column_helper_1 = require("./column.helper");
/**
 * Decorator for creating column definitions for both MikroORM and TypeORM.
 *
 * @template T - The type of the column.
 * @param typeOrOptions - The column type or additional options if provided.
 * @param options - The options for the column.
 * @returns PropertyDecorator.
 */
function MultiORMColumn(typeOrOptions, options) {
    // normalize parameters
    let type;
    if (typeof typeOrOptions === 'string' || typeof typeOrOptions === 'function') {
        // If typeOrOptions is a string or function, set 'type' to the resolved type and 'options' to an empty object.
        type = (0, column_helper_1.resolveDbType)(typeOrOptions);
    }
    else if (object_utils_1.ObjectUtils.isObject(typeOrOptions)) {
        // If typeOrOptions is an object, assume it is 'options' and set 'type' accordingly.
        options = typeOrOptions;
        type = (0, column_helper_1.resolveDbType)(options.type);
    }
    // Ensure 'options' is initialized to an empty object if it is null or undefined.
    if (!options)
        options = {};
    return (target, propertyKey) => {
        (0, typeorm_1.Column)({ type, ...options })(target, propertyKey);
        (0, core_1.Property)((0, column_helper_1.parseMikroOrmColumnOptions)({ type, options }))(target, propertyKey);
    };
}
exports.MultiORMColumn = MultiORMColumn;
//# sourceMappingURL=column.decorator.js.map