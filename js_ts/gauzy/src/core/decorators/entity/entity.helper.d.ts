import { MikroOrmEntityOptions, TypeOrmEntityOptions } from "./entity-options.types";
/**
 * Parse MikroORM entity options, renaming 'mikroOrmRepository' to 'repository'.
 *
 * @param {MikroOrmEntityOptions<any>} options - MikroORM entity options.
 * @returns {Record<string, any>} - Parsed options.
 */
export declare const parseMikroOrmEntityOptions: ({ mikroOrmRepository, ...restOptions }: MikroOrmEntityOptions<any>) => Record<string, any>;
/**
 * Parse TypeORM entity options, renaming 'typeOrmRepository' to 'repository'.
 *
 * @param {TypeOrmEntityOptions} options - TypeORM entity options.
 * @returns {Record<string, any>} - Parsed options.
 */
export declare const parseTypeOrmEntityOptions: ({ typeOrmRepository, ...restOptions }: TypeOrmEntityOptions) => Record<string, any>;
/**
 * Filters out undefined values from an object and returns a new object with only defined values.
 *
 * @param options The source object to be filtered. This can be of any type.
 * @returns {Record<string, any>} - Parsed options without undefined values.
 */
export declare const filterOptions: <T>(options: T) => Record<string, any>;
