"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMikroOrmColumnOptions = exports.resolveDbType = void 0;
/**
 * Resolve the database column type.
 * @param columnType - The input column type.
 * @returns The resolved column type.
 */
function resolveDbType(columnType) {
    return columnType;
}
exports.resolveDbType = resolveDbType;
/**
 * Parse MikroORM column options.
 * @param param0 - The options for parsing column arguments.
 * @returns MikroORM column options.
 */
function parseMikroOrmColumnOptions({ type, options }) {
    if (typeof options?.default === 'function') {
        options.default = options.default();
    }
    if (options?.relationId) {
        options.persist = false;
    }
    return {
        type: type,
        ...options
    };
}
exports.parseMikroOrmColumnOptions = parseMikroOrmColumnOptions;
//# sourceMappingURL=column.helper.js.map