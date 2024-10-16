"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTypeORMFindCountOptions = void 0;
/**
 * Parses TypeORM `FindManyOptions` to include `loadEagerRelations: false` and converts the 'where' option.
 *
 * @param options The options to parse.
 * @returns The parsed options with default values.
 */
function parseTypeORMFindCountOptions(options) {
    // Default options with loadEagerRelations set to false
    const typeormOptions = {
        loadEagerRelations: false
    };
    // Use the provided options for 'where' (if available)
    let where = {};
    // Parses TypeORM `where` option to MikroORM `where` option
    if (options && options.where) {
        where = options.where;
    }
    // Merge the options and return
    return { ...typeormOptions, where };
}
exports.parseTypeORMFindCountOptions = parseTypeORMFindCountOptions;
//# sourceMappingURL=utils.js.map