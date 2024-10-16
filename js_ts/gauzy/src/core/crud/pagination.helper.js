"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseObject = exports.convertNativeParameters = exports.parseBool = void 0;
const common_1 = require("../../../plugins/common");
/**
 * Parses the given value and converts it to a boolean using JSON.parse.
 *
 * @param value - The value to be parsed.
 * @returns {boolean} - The boolean representation of the parsed value.
 */
const parseBool = (value) => Boolean(JSON.parse(value));
exports.parseBool = parseBool;
/**
 * Converts native parameters based on the database connection type.
 *
 * @param parameters - The parameters to be converted.
 * @returns {any} - The converted parameters based on the database connection type.
 */
const convertNativeParameters = (parameters) => {
    try {
        // Mapping boolean values to their numeric representation
        if (Array.isArray(parameters)) {
            // If it's an array, process each element
            return parameters.map((item) => (0, exports.convertNativeParameters)(item));
            // Mapping boolean values to their numeric representation
        }
        else if (typeof parameters === "object" && parameters !== null) {
            // Recursively convert nested objects
            return Object.keys(parameters).reduce((acc, key) => {
                acc[key] = (0, exports.convertNativeParameters)(parameters[key]);
                return acc;
            }, {});
        }
        else {
            return (0, exports.parseBool)(parameters);
        }
    }
    catch (error) {
        return parameters;
    }
};
exports.convertNativeParameters = convertNativeParameters;
/**
 * Parse object to specific type
 *
 * @param source
 * @returns
 */
function parseObject(source, callback) {
    if ((0, common_1.isObject)(source)) {
        for (const key in source) {
            if ((0, common_1.isObject)(source[key])) {
                if (!(0, common_1.isClassInstance)(source[key])) {
                    parseObject(source[key], callback);
                }
            }
            else {
                Object.assign(source, { [key]: callback(source[key]) });
            }
        }
    }
    return source;
}
exports.parseObject = parseObject;
//# sourceMappingURL=pagination.helper.js.map