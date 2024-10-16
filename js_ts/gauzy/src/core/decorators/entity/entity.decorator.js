"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiORMEntity = void 0;
const core_1 = require("@mikro-orm/core");
const typeorm_1 = require("typeorm");
const common_1 = require("../../../../plugins/common");
const entity_helper_1 = require("./entity.helper");
/**
 * Decorator for creating entities with both MikroORM and TypeORM decorators.
 * @param nameOrOptions Name of the entity table or options for the entity.
 * @param maybeOptions Options for the entity (if nameOrOptions is a string).
 * @returns Class decorator.
 */
function MultiORMEntity(nameOrOptions, maybeOptions) {
    // Extract MikroORM options based on the type of nameOrOptions
    const mikroOrmOptions = (0, common_1.isObject)(nameOrOptions) ? nameOrOptions : typeof nameOrOptions === "string" ? { tableName: nameOrOptions, ...maybeOptions } : {};
    // Extract TypeORM options based on the type of nameOrOptions
    const typeOrmOptions = (0, common_1.isObject)(nameOrOptions) ? nameOrOptions : nameOrOptions || {};
    /**
     * Class decorator for creating entities with both MikroORM and TypeORM decorators.
     * @param target The target class.
     */
    return (target) => {
        // Apply MikroORM entity decorator to the target class prototype
        (0, core_1.Entity)((0, entity_helper_1.parseMikroOrmEntityOptions)(mikroOrmOptions))(target);
        // Apply TypeORM entity decorator to the target class
        (0, typeorm_1.Entity)(typeOrmOptions, maybeOptions)(target);
    };
}
exports.MultiORMEntity = MultiORMEntity;
//# sourceMappingURL=entity.decorator.js.map