import { ColumnDataType, MikroORMColumnOptions } from "./column-options.types";
/**
 * Resolve the database column type.
 * @param columnType - The input column type.
 * @returns The resolved column type.
 */
export declare function resolveDbType(columnType: ColumnDataType): ColumnDataType;
/**
 * Parse MikroORM column options.
 * @param param0 - The options for parsing column arguments.
 * @returns MikroORM column options.
 */
export declare function parseMikroOrmColumnOptions<T>({ type, options }: {
    type: any;
    options: any;
}): MikroORMColumnOptions<T>;
