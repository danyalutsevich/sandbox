"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapSerialize = exports.convertTypeORMWhereToMikroORM = exports.convertTypeORMConditionToMikroORM = exports.processFindOperator = exports.parseOrderOptions = exports.parseTypeORMFindToMikroOrm = exports.enhanceWhereWithTenantId = exports.concatIdToWhere = exports.flatten = exports.isDatabaseType = exports.getDBType = exports.getORMType = exports.MultiORMEnum = exports.isSqliteDB = exports.getArrayIntersection = exports.validateDateRange = exports.freshTimestamp = exports.generateRandomAlphaNumericCode = exports.generateRandomInteger = exports.getDaysBetweenDates = exports.getDateRangeFormat = exports.mergeOverlappingDateRanges = exports.getTenantLogo = exports.getOrganizationDummyImage = exports.getDateRange = exports.tempFile = exports.convertToDatetime = exports.unixTimestampToDate = exports.arrayToObject = exports.getLastDayOfMonth = exports.reflect = exports.getUserDummyImage = exports.getDummyImage = void 0;
const common_1 = require("@nestjs/common");
const sqlite_1 = require("@mikro-orm/sqlite");
const core_1 = require("@mikro-orm/core");
const mikro_orm_soft_delete_1 = require("mikro-orm-soft-delete");
const better_sqlite_1 = require("@mikro-orm/better-sqlite");
const postgresql_1 = require("@mikro-orm/postgresql");
const mysql_1 = require("@mikro-orm/mysql");
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const index_1 = require("../../plugins/config/dist/index");
const moment_extend_1 = require("./../core/moment-extend");
const constants_1 = require("./../constants");
var Utils;
(function (Utils) {
    function generatedLogoColor() {
        return (0, underscore_1.sample)(['#269aff', '#ffaf26', '#8b72ff', '#0ecc9D']).replace('#', '');
    }
    Utils.generatedLogoColor = generatedLogoColor;
})(Utils || (Utils = {}));
const getDummyImage = (width, height, letter) => {
    return `https://dummyimage.com/${width}x${height}/${Utils.generatedLogoColor()}/ffffff.jpg&text=${letter}`;
};
exports.getDummyImage = getDummyImage;
const getUserDummyImage = (user) => {
    const firstNameLetter = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
    if (firstNameLetter) {
        return (0, exports.getDummyImage)(330, 300, firstNameLetter);
    }
    else {
        const firstEmailLetter = user.email.charAt(0).toUpperCase();
        return (0, exports.getDummyImage)(330, 300, firstEmailLetter);
    }
};
exports.getUserDummyImage = getUserDummyImage;
function reflect(promise) {
    return promise.then((item) => ({ item, status: 'fulfilled' }), (error) => ({ error, status: 'rejected' }));
}
exports.reflect = reflect;
/**
 * To calculate the last day of a month, we need to set date=0 and month as the next month.
 * So, if we want the last day of February (February is month = 1) we'll need to perform 'new Date(year, 2, 0).getDate()'
 */
function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
exports.getLastDayOfMonth = getLastDayOfMonth;
function arrayToObject(array, key, value) {
    return array.reduce((prev, current) => {
        return {
            ...prev,
            [current[key]]: current[value]
        };
    }, {});
}
exports.arrayToObject = arrayToObject;
/*
 * To convert unix timestamp to datetime using date format
 */
function unixTimestampToDate(timestamps, format = 'YYYY-MM-DD HH:mm:ss') {
    const millisecond = 1000;
    return moment_extend_1.moment.unix(timestamps / millisecond).format(format);
}
exports.unixTimestampToDate = unixTimestampToDate;
/*
 * To convert any datetime to any datetime format
 */
function convertToDatetime(datetime) {
    if ((0, moment_extend_1.moment)(new Date(datetime)).isValid()) {
        switch ((0, index_1.getConfig)().dbConnectionOptions.type) {
            case index_1.DatabaseTypeEnum.sqlite:
            case index_1.DatabaseTypeEnum.betterSqlite3:
                return (0, moment_extend_1.moment)(new Date(datetime)).format('YYYY-MM-DD HH:mm:ss');
            case index_1.DatabaseTypeEnum.postgres:
            case index_1.DatabaseTypeEnum.mysql:
                return (0, moment_extend_1.moment)(new Date(datetime)).toDate();
            default:
                throw Error('cannot convert to date time');
        }
    }
    return null;
}
exports.convertToDatetime = convertToDatetime;
async function tempFile(prefix) {
    const tempPath = path.join(os.tmpdir(), prefix);
    const folder = await fs.promises.mkdtemp(tempPath);
    return path.join(folder, prefix + (0, moment_extend_1.moment)().unix() + Math.random() * 10000);
}
exports.tempFile = tempFile;
/*
 * Get date range according for different unitOfTimes
 */
function getDateRange(startDate, endDate, type = 'day', isFormat = false) {
    if (endDate === 'day' || endDate === 'week') {
        type = endDate;
    }
    let start = moment_extend_1.moment.utc().startOf(type);
    let end = moment_extend_1.moment.utc().endOf(type);
    if (startDate && endDate !== 'day' && endDate !== 'week') {
        start = moment_extend_1.moment.utc(startDate).startOf(type);
        end = moment_extend_1.moment.utc(endDate).endOf(type);
    }
    else {
        if ((startDate && endDate === 'day') || endDate === 'week' || (startDate && !endDate)) {
            start = moment_extend_1.moment.utc(startDate).startOf(type);
            end = moment_extend_1.moment.utc(startDate).endOf(type);
        }
    }
    if (!start.isValid() || !end.isValid()) {
        return;
    }
    if (end.isBefore(start)) {
        throw 'End date must be greater than start date.';
    }
    switch ((0, index_1.getConfig)().dbConnectionOptions.type) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            start = start.format('YYYY-MM-DD HH:mm:ss');
            end = end.format('YYYY-MM-DD HH:mm:ss');
            break;
        case index_1.DatabaseTypeEnum.postgres:
        case index_1.DatabaseTypeEnum.mysql:
            if (!isFormat) {
                start = start.toDate();
                end = end.toDate();
            }
            else {
                start = start.format();
                end = end.format();
            }
            break;
        default:
            throw Error(`cannot get date range due to unsupported database type: ${(0, index_1.getConfig)().dbConnectionOptions.type}`);
    }
    return {
        start,
        end
    };
}
exports.getDateRange = getDateRange;
const getOrganizationDummyImage = (name) => {
    const firstNameLetter = name ? name.charAt(0).toUpperCase() : '';
    return (0, exports.getDummyImage)(330, 300, firstNameLetter);
};
exports.getOrganizationDummyImage = getOrganizationDummyImage;
const getTenantLogo = (name) => {
    const firstNameLetter = name ? name.charAt(0).toUpperCase() : '';
    return (0, exports.getDummyImage)(330, 300, firstNameLetter);
};
exports.getTenantLogo = getTenantLogo;
/**
 * Merge Overlapping Date & Time
 *
 * @param ranges
 * @returns
 */
function mergeOverlappingDateRanges(ranges) {
    const sorted = ranges.sort(
    // By start, ascending
    (a, b) => a.start.getTime() - b.start.getTime());
    const dates = sorted.reduce((acc, curr) => {
        // Skip the first range
        if (acc.length === 0) {
            return [curr];
        }
        const prev = acc.pop();
        if (curr.end <= prev.end) {
            // Current range is completely inside previous
            return [...acc, prev];
        }
        // Merges overlapping (<) and contiguous (==) ranges
        if (curr.start <= prev.end) {
            // Current range overlaps previous
            return [...acc, { start: prev.start, end: curr.end }];
        }
        // Ranges do not overlap
        return [...acc, prev, curr];
    }, []);
    return dates;
}
exports.mergeOverlappingDateRanges = mergeOverlappingDateRanges;
/**
 * GET Date Range Format
 *
 * @param startDate
 * @param endDate
 * @returns
 */
function getDateRangeFormat(startDate, endDate) {
    let start = (0, moment_extend_1.moment)(startDate);
    let end = (0, moment_extend_1.moment)(endDate);
    if (!start.isValid() || !end.isValid()) {
        return;
    }
    if (end.isBefore(start)) {
        throw 'End date must be greater than start date.';
    }
    switch ((0, index_1.getConfig)().dbConnectionOptions.type) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            return {
                start: start.format('YYYY-MM-DD HH:mm:ss'),
                end: end.format('YYYY-MM-DD HH:mm:ss')
            };
        case index_1.DatabaseTypeEnum.postgres:
        case index_1.DatabaseTypeEnum.mysql:
            return {
                start: start.toDate(),
                end: end.toDate()
            };
        default:
            throw Error(`cannot get date range due to unsupported database type: ${(0, index_1.getConfig)().dbConnectionOptions.type}`);
    }
}
exports.getDateRangeFormat = getDateRangeFormat;
/**
 * Get all dates between two dates using Moment.js.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @returns An array of string representations of dates.
 */
function getDaysBetweenDates(startDate, endDate, timeZone = moment_extend_1.moment.tz.guess()) {
    // Convert start and end dates to the specified timezone
    const start = moment_extend_1.moment.utc(startDate, 'YYYY-MM-DD HH:mm:ss').clone().tz(timeZone);
    const end = moment_extend_1.moment.utc(endDate, 'YYYY-MM-DD HH:mm:ss').clone().tz(timeZone);
    // Create a range using the moment-range library
    const ranges = moment_extend_1.moment.range(start, end);
    // Generate an array of dates within the range, formatted as 'YYYY-MM-DD'
    return Array.from(ranges.by('day')).map((date) => date.format('YYYY-MM-DD'));
}
exports.getDaysBetweenDates = getDaysBetweenDates;
/**
 * Generating a random integer number with flexible length
 *
 * @param length
 */
function generateRandomInteger(length = 6) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}
exports.generateRandomInteger = generateRandomInteger;
/**
 * Generate a random alphanumeric code.
 * @param length The length of the code. Default is 6.
 * @returns The generated code.
 */
function generateRandomAlphaNumericCode(length = constants_1.ALPHA_NUMERIC_CODE_LENGTH) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        code += characters[index];
    }
    return code;
}
exports.generateRandomAlphaNumericCode = generateRandomAlphaNumericCode;
/**
 * Get a fresh timestamp for the entity.
 *
 * @returns {Date}
 */
function freshTimestamp() {
    return new Date(moment_extend_1.moment.now());
}
exports.freshTimestamp = freshTimestamp;
/**
 * Function that performs the date range validation
 *
 * @param startedAt
 * @param stoppedAt
 * @returns
 */
function validateDateRange(startedAt, stoppedAt) {
    try {
        const start = (0, moment_extend_1.moment)(startedAt);
        const end = (0, moment_extend_1.moment)(stoppedAt);
        console.log('------ Stopped Timer ------', start.toDate(), end.toDate());
        if (!start.isValid() || !end.isValid()) {
            throw 'Started and Stopped date must be valid date.';
            // If either start or end date is invalid, return without throwing an exception
        }
        if (end.isBefore(start)) {
            throw 'Stopped date must be greater than started date.';
        }
    }
    catch (error) {
        // If any error occurs during date validation, throw a BadRequestException
        throw new common_1.BadRequestException(error);
    }
}
exports.validateDateRange = validateDateRange;
/**
 * Function that returns intersection of 2 arrays
 * @param arr1 Array 1
 * @param arr2 Array 2
 * @returns Intersection of arr1 and arr2
 */
function getArrayIntersection(arr1, arr2) {
    const set1 = new Set(arr1);
    return arr2.filter((element) => set1.has(element));
}
exports.getArrayIntersection = getArrayIntersection;
/**
 * Check if the given database connection type is SQLite.
 *
 * @param {string} dbConnection - The database connection type.
 * @returns {boolean} - Returns true if the database connection type is SQLite.
 */
function isSqliteDB(dbConnection) {
    return isDatabaseType([index_1.DatabaseTypeEnum.sqlite, index_1.DatabaseTypeEnum.betterSqlite3], dbConnection);
}
exports.isSqliteDB = isSqliteDB;
/**
 * Enum representing different ORM types.
 */
var MultiORMEnum;
(function (MultiORMEnum) {
    MultiORMEnum["TypeORM"] = "typeorm";
    MultiORMEnum["MikroORM"] = "mikro-orm";
})(MultiORMEnum || (exports.MultiORMEnum = MultiORMEnum = {}));
/**
 * Get the Object-Relational Mapping (ORM) type from the environment variable `DB_ORM`.
 * @param {MultiORM} defaultValue - The default ORM type to use if `DB_ORM` is not set or an invalid value is provided.
 * @returns {MultiORM} - The determined ORM type.
 */
function getORMType(defaultValue = MultiORMEnum.TypeORM) {
    // Check if the environment variable `DB_ORM` is not set, and return the default value.
    if (!process.env.DB_ORM)
        return defaultValue;
    // Determine the ORM type based on the value of `DB_ORM`.
    switch (process.env.DB_ORM) {
        case MultiORMEnum.TypeORM:
            return MultiORMEnum.TypeORM;
        case MultiORMEnum.MikroORM:
            return MultiORMEnum.MikroORM;
        default:
            // If an invalid value is provided, return the default value.
            return defaultValue;
    }
}
exports.getORMType = getORMType;
/**
 * Gets the database type based on the provided database connection options or default options.
 *
 * @param {IDBConnectionOptions} [dbConnection] - The optional database connection options.
 * @returns {DatabaseTypeEnum} - The detected database type.
 */
function getDBType(dbConnection) {
    const dbORM = getORMType();
    if (!dbConnection) {
        dbConnection = (0, index_1.getConfig)().dbConnectionOptions;
    }
    let dbType;
    switch (dbORM) {
        case MultiORMEnum.MikroORM:
            if (dbConnection.driver instanceof sqlite_1.SqliteDriver) {
                dbType = index_1.DatabaseTypeEnum.sqlite;
            }
            else if (dbConnection.driver instanceof better_sqlite_1.BetterSqliteDriver) {
                dbType = index_1.DatabaseTypeEnum.betterSqlite3;
            }
            else if (dbConnection.driver instanceof postgresql_1.PostgreSqlDriver) {
                dbType = index_1.DatabaseTypeEnum.postgres;
            }
            else if (dbConnection.driver instanceof mysql_1.MySqlDriver) {
                dbType = index_1.DatabaseTypeEnum.mysql;
            }
            else {
                dbType = index_1.DatabaseTypeEnum.postgres;
            }
            break;
        default:
            dbType = dbConnection.type;
            break;
    }
    return dbType;
}
exports.getDBType = getDBType;
/**
 * Checks whether the provided database type(s) match the database type of the given connection options.
 * If no connection options are provided, it uses the default options from the configuration.
 *
 * @param {DatabaseTypeEnum | DatabaseTypeEnum[]} types - The expected database type(s) to check against.
 * @param {IDBConnectionOptions} [dbConnection] - The optional database connection options.
 * @returns {boolean} - Returns true if the database type matches any of the provided types.
 */
function isDatabaseType(types, dbConnection) {
    // If no connection options are provided, use the default options from the configuration
    if (!dbConnection) {
        dbConnection = (0, index_1.getConfig)().dbConnectionOptions;
    }
    // Get the database type from the connection options
    let dbType = getDBType(dbConnection);
    // Check if the provided types match the database type
    if (types instanceof Array) {
        return types.includes(dbType);
    }
    else {
        return types == dbType;
    }
}
exports.isDatabaseType = isDatabaseType;
/**
 * Recursively flattens nested objects into an array of dot-notated keys.
 * If the input is already an array, returns it as is.
 *
 * @param {any} input - The input object or array to be flattened.
 * @returns {string[]} - An array of dot-notated keys.
 */
const flatten = (input) => {
    if (Array.isArray(input)) {
        // If input is already an array, return it as is
        return input;
    }
    if (typeof input === 'object' && input !== null) {
        return (Object.keys(input).reduce((acc, key) => {
            const value = input[key];
            if (value) {
                const nestedKeys = (0, exports.flatten)(value);
                const newKey = Array.isArray(value)
                    ? key
                    : nestedKeys.length > 0
                        ? `${key}.${nestedKeys.join('.')}`
                        : key;
                return acc.concat(newKey);
            }
        }, []) || []);
    }
    // If input is neither an array nor an object, return an empty array
    return [];
};
exports.flatten = flatten;
/**
 * Concatenate an ID to the given MikroORM where condition.
 *
 * @param id - The ID to concatenate to the where condition.
 * @param where - MikroORM where condition.
 * @returns Concatenated MikroORM where condition.
 */
function concatIdToWhere(id, where) {
    if (where instanceof Array) {
        where = where.concat({ id });
    }
    else {
        where = {
            id,
            ...(where ? where : {})
        };
    }
    return where;
}
exports.concatIdToWhere = concatIdToWhere;
/**
 * Adds 'tenantId' to a 'where' clause, supporting both objects and arrays.
 *
 * @param tenantId - The tenant ID to add.
 * @param where - The current 'where' clause.
 * @returns An updated 'where' clause including the 'tenantId'.
 */
function enhanceWhereWithTenantId(tenantId, where) {
    if (Array.isArray(where)) {
        // Merge tenantId into each object of the array
        return where.map((condition) => ({ ...condition, tenantId }));
    }
    else {
        // Merge where with tenantId if where is an object
        return { ...where, tenantId };
    }
}
exports.enhanceWhereWithTenantId = enhanceWhereWithTenantId;
/**
 * Convert TypeORM's FindManyOptions to MikroORM's equivalent options.
 *
 * @param options - TypeORM's FindManyOptions.
 * @returns An object with MikroORM's where and options.
 */
function parseTypeORMFindToMikroOrm(options) {
    const mikroOptions = {
        disableIdentityMap: true,
        populate: []
    };
    let where = {};
    // Parses TypeORM `where` option to MikroORM `where` option
    if (options && options.where) {
        where = convertTypeORMWhereToMikroORM(options.where);
    }
    // Parses TypeORM `select` option to MikroORM `fields` option
    if (options && options.select) {
        mikroOptions.fields = (0, exports.flatten)(options.select);
    }
    // Parses TypeORM `relations` option to MikroORM `populate` option
    if (options && options.relations) {
        mikroOptions.populate = (0, exports.flatten)(options.relations);
    }
    // Parses TypeORM `order` option to MikroORM `orderBy` option
    if (options && options.order) {
        mikroOptions.orderBy = parseOrderOptions(options.order);
    }
    // Parses TypeORM `skip` option to MikroORM `offset` option
    if (options && options.skip) {
        mikroOptions.offset = options.take * (options.skip - 1);
    }
    // Parses TypeORM `take` option to MikroORM `limit` option
    if (options && options.take) {
        mikroOptions.limit = options.take;
    }
    // If options contain 'withDeleted', add the SOFT_DELETABLE_FILTER to existing filters
    if (options && options.withDeleted) {
        mikroOptions.filters = { [mikro_orm_soft_delete_1.SOFT_DELETABLE_FILTER]: false };
    }
    return { where, mikroOptions };
}
exports.parseTypeORMFindToMikroOrm = parseTypeORMFindToMikroOrm;
/**
 * Parses TypeORM 'order' option to MikroORM 'orderBy' option.
 * @param order TypeORM 'order' option
 * @returns Parsed MikroORM 'orderBy' option
 */
function parseOrderOptions(order) {
    return Object.entries(order).reduce((acc, [key, value]) => {
        acc[key] = `${value}`.toLowerCase();
        return acc;
    }, {});
}
exports.parseOrderOptions = parseOrderOptions;
/**
 * Transforms a FindOperator object into a query condition suitable for database operations.
 * It handles simple conditions such as 'equal', 'in' and 'between',
 * as well as complex conditions like recursive 'not' operators and range queries with 'between'.
 *
 * @param operator A FindOperator object containing the type of condition and its corresponding value.
 * @returns A query condition in the format of a Record<string, any> that represents the translated condition.
 *
 */
function processFindOperator(operator) {
    switch (operator.type) {
        case 'isNull': {
            return null;
        }
        case 'not': {
            // If the nested value is also a FindOperator, process it recursively
            if (operator.child && operator.child instanceof typeorm_1.FindOperator) {
                return { $ne: processFindOperator(operator.child) };
            }
            else {
                const nested = operator.value || null;
                return { $ne: nested };
            }
        }
        case 'in': {
            return { $in: operator.value };
        }
        case 'equal': {
            return { $eq: operator.value };
        }
        case 'between': {
            // Assuming the value for 'between' is an array with two elements
            return {
                $gte: operator.value[0],
                $lte: operator.value[1]
            };
        }
        case 'moreThanOrEqual': {
            return { $gte: operator.value };
        }
        // Add additional cases for other operator types if needed
        default: {
            // Handle unknown or unimplemented operator types
            console.warn(`Unsupported FindOperator type: ${operator.type}`);
            return {};
        }
    }
}
exports.processFindOperator = processFindOperator;
/**
 * Converts a TypeORM query condition into a format that is compatible with MikroORM.
 * This function recursively processes each condition, handling both simple key-value
 * pairs and complex nested objects including FindOperators.
 *
 * @param where The TypeORM condition to be converted, typically as a filter query object.
 * @returns An object representing the MikroORM compatible condition.
 */
function convertTypeORMConditionToMikroORM(where) {
    const mikroORMCondition = {};
    for (const [key, value] of Object.entries(where)) {
        if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
            if (value instanceof typeorm_1.FindOperator) {
                // Convert nested FindOperators
                mikroORMCondition[key] = processFindOperator(value);
            }
            else {
                // Recursively convert nested objects
                mikroORMCondition[key] = convertTypeORMConditionToMikroORM(value);
            }
        }
        else {
            // Assign simple key-value pairs directly
            mikroORMCondition[key] = value;
        }
    }
    return mikroORMCondition;
}
exports.convertTypeORMConditionToMikroORM = convertTypeORMConditionToMikroORM;
/**
 * Converts TypeORM 'where' conditions into a format compatible with MikroORM.
 * This function can handle both individual condition objects and arrays of conditions,
 * applying the necessary conversion to each condition.
 *
 * @param where The TypeORM 'where' condition or an array of conditions to be converted.
 * @returns A MikroORM compatible condition or array of conditions.
 */
function convertTypeORMWhereToMikroORM(where) {
    // If 'where' is an array, process each condition in the array
    if (Array.isArray(where)) {
        return where.map((condition) => convertTypeORMConditionToMikroORM(condition));
    }
    // Otherwise, just convert the single condition object
    return convertTypeORMConditionToMikroORM(where);
}
exports.convertTypeORMWhereToMikroORM = convertTypeORMWhereToMikroORM;
/**
 * Serializes the provided entity based on the ORM type.
 * @param entity The entity to be serialized.
 * @returns The serialized entity.
 */
function wrapSerialize(entity) {
    // If using MikroORM, use wrap(entity).toJSON() for serialization
    return (0, core_1.wrap)(entity).toJSON();
}
exports.wrapSerialize = wrapSerialize;
//# sourceMappingURL=utils.js.map