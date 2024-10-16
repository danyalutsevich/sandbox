/**
 * Interface of the simple literal object with any string keys.
 */
export interface SimpleObjectLiteral {
    [key: string]: any;
}
/**
 * Parses the given value and converts it to a boolean using JSON.parse.
 *
 * @param value - The value to be parsed.
 * @returns {boolean} - The boolean representation of the parsed value.
 */
export declare const parseBool: (value: any) => boolean;
/**
 * Converts native parameters based on the database connection type.
 *
 * @param parameters - The parameters to be converted.
 * @returns {any} - The converted parameters based on the database connection type.
 */
export declare const convertNativeParameters: (parameters: any) => any;
/**
 * Parse object to specific type
 *
 * @param source
 * @returns
 */
export declare function parseObject(source: Object, callback: Function): Object;
