"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConationFromQuery = exports.convertTypeOrmConationAndParamsToMikroOrm = void 0;
/**
 * Converts TypeORM-style where conditions and parameters to Mikro-ORM-style.
 * @param whereCondition The TypeORM-style where condition string.
 * @param parameters The TypeORM-style parameters object.
 * @returns An array where the first element is the converted where condition string
 * and the second element is the array of parameters for Mikro-ORM.
 */
function convertTypeOrmConationAndParamsToMikroOrm(whereCondition, parameters) {
    const mikroOrmParameters = [];
    const mikroOrmCondition = whereCondition.replace(/:(\w+)/g, (match, paramName) => {
        // Check if the parameter exists; if not, throw an error or handle as needed
        if (!(paramName in parameters)) {
            throw new Error(`Parameter "${paramName}" not found.`);
        }
        mikroOrmParameters.push(parameters[paramName]);
        return '?'; // Replace named parameters with positional parameters
    });
    return [mikroOrmCondition, mikroOrmParameters];
}
exports.convertTypeOrmConationAndParamsToMikroOrm = convertTypeOrmConationAndParamsToMikroOrm;
function getConationFromQuery(query) {
    const whereIndex = query.toUpperCase().indexOf("WHERE");
    if (whereIndex !== -1) {
        const conditions = query
            .substring(whereIndex + "WHERE".length)
            .trim()
            .replace(/\$\d+/g, '?'); // Extract where condition from query;
        return conditions;
    }
    else {
        return null;
    }
}
exports.getConationFromQuery = getConationFromQuery;
//# sourceMappingURL=utils.js.map