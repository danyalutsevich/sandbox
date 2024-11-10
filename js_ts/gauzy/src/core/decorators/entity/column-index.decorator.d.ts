import { IndexOptions as TypeOrmIndexOptions } from 'typeorm';
import { IndexOptions as MikroOrmIndexOptions } from '@mikro-orm/core';
type CombinedIndexOptions<T> = string | string[] | ((object: any) => any[] | {
    [key: string]: number;
}) | TypeOrmIndexOptions | MikroOrmIndexOptions<T>;
export declare function ColumnIndex<T>(options?: CombinedIndexOptions<T>): ClassDecorator & PropertyDecorator;
export declare function ColumnIndex<T>(name?: string, options?: CombinedIndexOptions<T>): ClassDecorator & PropertyDecorator;
export declare function ColumnIndex<T>(name: string, fields: string[], options?: CombinedIndexOptions<T>): ClassDecorator & PropertyDecorator;
export declare function ColumnIndex<T>(fields: string[], options?: CombinedIndexOptions<T>): ClassDecorator & PropertyDecorator;
/**
 * Applies a TypeORM index to the specified target.
 *
 * @param target The class or class property to which the index will be applied.
 * @param propertyKey The name of the property, if applying to a specific property.
 * @param name Optional name of the index for named indexes.
 * @param properties Optional list of properties to be indexed.
 * @param options Optional TypeORM indexing options.
 */
export declare function applyTypeOrmIndex(target: any, propertyKey: string | undefined, name: string | undefined, fields: string[] | undefined, options?: TypeOrmIndexOptions): void;
/**
 * Applies a MikroORM index to the specified target. If 'unique' option is set,
 * also applies a unique constraint. This function adapts TypeORM index options
 * to MikroORM.
 *
 * @param target The class or class property to which the index will be applied.
 * @param propertyKey The name of the property, if applying to a specific property.
 * @param name Optional name of the index for named indexes.
 * @param properties Optional list of properties to be indexed.
 * @param options Optional TypeORM indexing options that will be adapted for MikroORM.
 */
export declare function applyMikroOrmIndex(target: any, propertyKey: string | undefined, name: string | undefined, properties: string[] | undefined, options: TypeOrmIndexOptions | undefined): void;
/**
 * Transforms index options from TypeORM format to MikroORM format.
 * This function should be implemented based on the specific requirements and
 * differences between TypeORM and MikroORM index options.
 *
 * @param options The TypeORM index options to be transformed.
 * @returns The transformed MikroORM index options.
 */
export declare function parseToMikroOrmIndexOptions<T>(options: MikroOrmIndexOptions<T>): MikroOrmIndexOptions<T>;
export {};
