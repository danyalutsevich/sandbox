import { FindOptions as MikroORMFindOptions, FilterQuery as MikroFilterQuery } from '@mikro-orm/core';
import { FindManyOptions, FindOperator, FindOptionsOrder } from 'typeorm';
import { DateRange, IDateRange, IUser } from '../../plugins/contracts/dist/index';
import { IDBConnectionOptions } from '../../plugins/common/dist/index';
import { DatabaseTypeEnum } from '../../plugins/config/dist/index';
export declare const getDummyImage: (width: number, height: number, letter: string) => string;
export declare const getUserDummyImage: (user: IUser) => string;
export declare function reflect(promise: any): any;
/**
 * To calculate the last day of a month, we need to set date=0 and month as the next month.
 * So, if we want the last day of February (February is month = 1) we'll need to perform 'new Date(year, 2, 0).getDate()'
 */
export declare function getLastDayOfMonth(year: any, month: any): number;
export declare function arrayToObject(array: any, key: any, value: any): any;
export declare function unixTimestampToDate(timestamps: any, format?: string): string;
export declare function convertToDatetime(datetime: any): Date | string | null;
export declare function tempFile(prefix: any): Promise<string>;
export declare function getDateRange(startDate?: string | Date, endDate?: string | Date, type?: 'day' | 'week', isFormat?: boolean): {
    start: any;
    end: any;
};
export declare const getOrganizationDummyImage: (name: string) => string;
export declare const getTenantLogo: (name: string) => string;
/**
 * Merge Overlapping Date & Time
 *
 * @param ranges
 * @returns
 */
export declare function mergeOverlappingDateRanges(ranges: IDateRange[]): IDateRange[];
/**
 * GET Date Range Format
 *
 * @param startDate
 * @param endDate
 * @returns
 */
export declare function getDateRangeFormat(startDate: moment.Moment, endDate: moment.Moment): DateRange;
/**
 * Get all dates between two dates using Moment.js.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @returns An array of string representations of dates.
 */
export declare function getDaysBetweenDates(startDate: string | Date, endDate: string | Date, timeZone?: string): string[];
/**
 * Generating a random integer number with flexible length
 *
 * @param length
 */
export declare function generateRandomInteger(length?: number): number;
/**
 * Generate a random alphanumeric code.
 * @param length The length of the code. Default is 6.
 * @returns The generated code.
 */
export declare function generateRandomAlphaNumericCode(length?: number): string;
/**
 * Get a fresh timestamp for the entity.
 *
 * @returns {Date}
 */
export declare function freshTimestamp(): Date;
/**
 * Function that performs the date range validation
 *
 * @param startedAt
 * @param stoppedAt
 * @returns
 */
export declare function validateDateRange(startedAt: Date, stoppedAt: Date): void;
/**
 * Function that returns intersection of 2 arrays
 * @param arr1 Array 1
 * @param arr2 Array 2
 * @returns Intersection of arr1 and arr2
 */
export declare function getArrayIntersection(arr1: any[], arr2: any[]): any[];
/**
 * Check if the given database connection type is SQLite.
 *
 * @param {string} dbConnection - The database connection type.
 * @returns {boolean} - Returns true if the database connection type is SQLite.
 */
export declare function isSqliteDB(dbConnection?: IDBConnectionOptions): boolean;
/**
 * Enum representing different ORM types.
 */
export declare enum MultiORMEnum {
    TypeORM = "typeorm",
    MikroORM = "mikro-orm"
}
/**
 * Type representing the ORM types.
 */
export type MultiORM = 'typeorm' | 'mikro-orm';
/**
 * Get the Object-Relational Mapping (ORM) type from the environment variable `DB_ORM`.
 * @param {MultiORM} defaultValue - The default ORM type to use if `DB_ORM` is not set or an invalid value is provided.
 * @returns {MultiORM} - The determined ORM type.
 */
export declare function getORMType(defaultValue?: MultiORM): MultiORM;
/**
 * Gets the database type based on the provided database connection options or default options.
 *
 * @param {IDBConnectionOptions} [dbConnection] - The optional database connection options.
 * @returns {DatabaseTypeEnum} - The detected database type.
 */
export declare function getDBType(dbConnection?: IDBConnectionOptions): any;
/**
 * Checks whether the provided database type(s) match the database type of the given connection options.
 * If no connection options are provided, it uses the default options from the configuration.
 *
 * @param {DatabaseTypeEnum | DatabaseTypeEnum[]} types - The expected database type(s) to check against.
 * @param {IDBConnectionOptions} [dbConnection] - The optional database connection options.
 * @returns {boolean} - Returns true if the database type matches any of the provided types.
 */
export declare function isDatabaseType(types: DatabaseTypeEnum | DatabaseTypeEnum[], dbConnection?: IDBConnectionOptions): boolean;
/**
 * Recursively flattens nested objects into an array of dot-notated keys.
 * If the input is already an array, returns it as is.
 *
 * @param {any} input - The input object or array to be flattened.
 * @returns {string[]} - An array of dot-notated keys.
 */
export declare const flatten: (input: any) => any;
/**
 * Concatenate an ID to the given MikroORM where condition.
 *
 * @param id - The ID to concatenate to the where condition.
 * @param where - MikroORM where condition.
 * @returns Concatenated MikroORM where condition.
 */
export declare function concatIdToWhere<T>(id: any, where: MikroFilterQuery<T>): MikroFilterQuery<T>;
/**
 * Adds 'tenantId' to a 'where' clause, supporting both objects and arrays.
 *
 * @param tenantId - The tenant ID to add.
 * @param where - The current 'where' clause.
 * @returns An updated 'where' clause including the 'tenantId'.
 */
export declare function enhanceWhereWithTenantId<T>(tenantId: any, where: MikroFilterQuery<T>): MikroFilterQuery<T>;
/**
 * Convert TypeORM's FindManyOptions to MikroORM's equivalent options.
 *
 * @param options - TypeORM's FindManyOptions.
 * @returns An object with MikroORM's where and options.
 */
export declare function parseTypeORMFindToMikroOrm<T>(options: FindManyOptions): {
    where: MikroFilterQuery<T>;
    mikroOptions: MikroORMFindOptions<T, any, any, any>;
};
/**
 * Parses TypeORM 'order' option to MikroORM 'orderBy' option.
 * @param order TypeORM 'order' option
 * @returns Parsed MikroORM 'orderBy' option
 */
export declare function parseOrderOptions(order: FindOptionsOrder<any>): {};
/**
 * Transforms a FindOperator object into a query condition suitable for database operations.
 * It handles simple conditions such as 'equal', 'in' and 'between',
 * as well as complex conditions like recursive 'not' operators and range queries with 'between'.
 *
 * @param operator A FindOperator object containing the type of condition and its corresponding value.
 * @returns A query condition in the format of a Record<string, any> that represents the translated condition.
 *
 */
export declare function processFindOperator<T>(operator: FindOperator<T>): any;
/**
 * Converts a TypeORM query condition into a format that is compatible with MikroORM.
 * This function recursively processes each condition, handling both simple key-value
 * pairs and complex nested objects including FindOperators.
 *
 * @param where The TypeORM condition to be converted, typically as a filter query object.
 * @returns An object representing the MikroORM compatible condition.
 */
export declare function convertTypeORMConditionToMikroORM<T>(where: MikroFilterQuery<T>): {};
/**
 * Converts TypeORM 'where' conditions into a format compatible with MikroORM.
 * This function can handle both individual condition objects and arrays of conditions,
 * applying the necessary conversion to each condition.
 *
 * @param where The TypeORM 'where' condition or an array of conditions to be converted.
 * @returns A MikroORM compatible condition or array of conditions.
 */
export declare function convertTypeORMWhereToMikroORM<T>(where: MikroFilterQuery<T>): {};
/**
 * Serializes the provided entity based on the ORM type.
 * @param entity The entity to be serialized.
 * @returns The serialized entity.
 */
export declare function wrapSerialize<T extends object>(entity: T): T;
