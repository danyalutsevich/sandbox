"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOptions = exports.parseTypeOrmEntityOptions = exports.parseMikroOrmEntityOptions = void 0;
/**
 * Parse MikroORM entity options, renaming 'mikroOrmRepository' to 'repository'.
 *
 * @param {MikroOrmEntityOptions<any>} options - MikroORM entity options.
 * @returns {Record<string, any>} - Parsed options.
 */
const parseMikroOrmEntityOptions = ({ mikroOrmRepository, ...restOptions }) => ((0, exports.filterOptions)({
    repository: mikroOrmRepository,
    ...restOptions,
}));
exports.parseMikroOrmEntityOptions = parseMikroOrmEntityOptions;
/**
 * Parse TypeORM entity options, renaming 'typeOrmRepository' to 'repository'.
 *
 * @param {TypeOrmEntityOptions} options - TypeORM entity options.
 * @returns {Record<string, any>} - Parsed options.
 */
const parseTypeOrmEntityOptions = ({ typeOrmRepository, ...restOptions }) => ((0, exports.filterOptions)({
    repository: typeOrmRepository,
    ...restOptions,
}));
exports.parseTypeOrmEntityOptions = parseTypeOrmEntityOptions;
/**
 * Filters out undefined values from an object and returns a new object with only defined values.
 *
 * @param options The source object to be filtered. This can be of any type.
 * @returns {Record<string, any>} - Parsed options without undefined values.
 */
const filterOptions = (options) => Object.fromEntries(Object.entries(options).filter(([_, value]) => value !== undefined));
exports.filterOptions = filterOptions;
//# sourceMappingURL=entity.helper.js.map