import { ColumnDataType, ColumnOptions } from './column-options.types';
/**
 * Decorator for creating column definitions for both MikroORM and TypeORM.
 *
 * @template T - The type of the column.
 * @param typeOrOptions - The column type or additional options if provided.
 * @param options - The options for the column.
 * @returns PropertyDecorator.
 */
export declare function MultiORMColumn<T>(typeOrOptions?: ColumnDataType | ColumnOptions<T>, options?: ColumnOptions<T>): PropertyDecorator;
