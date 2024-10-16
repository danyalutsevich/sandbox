import { MikroOrmEntityOptions, TypeOrmEntityOptions } from "./entity-options.types";
/**
 * Decorator for creating entities with both MikroORM and TypeORM decorators.
 * @param options Options for the entity.
 */
export declare function MultiORMEntity<T>(options?: TypeOrmEntityOptions | MikroOrmEntityOptions<T>): ClassDecorator;
/**
 * Decorator for creating entities with both MikroORM and TypeORM decorators.
 * @param name Name of the entity table.
 * @param options Options for the entity.
 */
export declare function MultiORMEntity<T>(name?: string, options?: TypeOrmEntityOptions | MikroOrmEntityOptions<T>): ClassDecorator;
