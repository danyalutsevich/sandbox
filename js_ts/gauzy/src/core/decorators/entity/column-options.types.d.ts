import { ColumnType as MikroORMColumnType, PropertyOptions as MikroORMPropertyOptions } from '@mikro-orm/core';
import { ColumnType as TypeORMColumnType, ColumnOptions as TypeORMColumnOptions } from 'typeorm';
type CommonColumnOptions<T> = Omit<MikroORMColumnOptions<T>, 'type' | 'default'> & Omit<TypeORMColumnOptions, 'type'> & {
    type?: ColumnDataType;
    relationId?: boolean;
};
export type MikroORMColumnOptions<T> = MikroORMPropertyOptions<T>;
export type ColumnDataType = TypeORMColumnType | MikroORMColumnType;
export type ColumnOptions<T> = CommonColumnOptions<T>;
export {};
