import { ColumnEmbeddedOptions as TypeOrmEmbeddedOptions } from 'typeorm/decorator/options/ColumnEmbeddedOptions';
import { EmbeddedOptions as MikroOrmEmbeddedOptions } from '@mikro-orm/core';
import { Type } from '../../../../plugins/common';
/**
 * ColumnEmbeddedOptions combines options from TypeORM and MikroORM embedded columns.
 * It merges all properties from TypeOrmEmbeddedOptions and MikroOrmEmbeddedOptions.
 */
export type ColumnEmbeddedOptions = TypeOrmEmbeddedOptions & MikroOrmEmbeddedOptions;
/**
 * Options for embedding columns in entities.
 */
export type EntityColumnEmbeddedOptions = {
    /**
     * Function returning the Type of the MikroORM embeddable entity.
     * Allows dynamic referencing of the embedded class in MikroORM.
     */
    mikroOrmEmbeddableEntity?: () => Type;
    /**
     * Function returning the Type of the TypeORM embeddable entity.
     * Used to reference the embedded class in TypeORM.
     */
    typeOrmEmbeddableEntity?: () => Type;
};
/**
 * Decorator for creating entities with both MikroORM and TypeORM decorators.
 * @param options Options for the entity.
 */
export declare function EmbeddedColumn(typeOrTarget?: EntityColumnEmbeddedOptions, options?: ColumnEmbeddedOptions): PropertyDecorator;
/**
 * Parses and processes MikroORM embeddable column options.
 *
 * @param param0 Contains the `mikroOrmEmbeddableEntity` property.
 * @param restOptions Additional MikroOrmEmbeddedOptions to be filtered and processed.
 * @returns A new object with only key-value pairs where the value is defined.
 */
export declare const parseMikroOrmEmbeddableColumnOptions: ({ mikroOrmEmbeddableEntity }: EntityColumnEmbeddedOptions, restOptions: MikroOrmEmbeddedOptions) => Record<string, any>;
/**
 * Parses and processes TypeORM embeddable column options.
 *
 * @param restOptions The TypeORM embedded column options to be filtered and processed.
 * @returns A new object with only key-value pairs where the value is defined.
 */
export declare const parseTypeOrmEmbeddableColumnOptions: (restOptions: TypeOrmEmbeddedOptions) => Record<string, any>;
