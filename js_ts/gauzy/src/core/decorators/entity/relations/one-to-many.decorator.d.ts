import { Cascade, EntityName, OneToManyOptions } from '@mikro-orm/core';
import { MikroORMInverseSide, TypeORMInverseSide, TypeORMRelationOptions, TypeORMTarget } from './shared-types';
/**
 * Options for mapping One-to-Many relationship arguments for MikroORM.
 */
export interface MapOneToManyArgsForMikroORMOptions<T, O> {
    typeFunctionOrTarget: TargetEntity<T>;
    inverseSide?: InverseSide<T>;
    options?: RelationOptions<T>;
}
type MikroORMTarget<T, O> = OneToManyOptions<T, O> | string | ((e?: any) => EntityName<T>);
type MikroORMRelationOptions<T, O> = Omit<Partial<OneToManyOptions<T, O>>, 'cascade'>;
type TargetEntity<T> = TypeORMTarget<T> | MikroORMTarget<T, any>;
type InverseSide<T> = TypeORMInverseSide<T> & MikroORMInverseSide<T>;
type RelationOptions<T> = MikroORMRelationOptions<T, any> & TypeORMRelationOptions & {
    cascade?: Cascade[] | (boolean | ("update" | "insert" | "remove" | "soft-remove" | "recover")[]);
};
/**
 * Decorator for defining One-to-Many relationships that works with both MikroORM and TypeORM.
 *
 * @param typeFunctionOrTarget - Type or target function for the related entity.
 * @param inverseSide - Inverse side of the relationship or additional options (if options is provided first).
 * @param options - Additional options for the One-to-Many relationship.
 * @returns PropertyDecorator.
 */
export declare function MultiORMOneToMany<T>(typeFunctionOrTarget: TargetEntity<T>, inverseSide?: InverseSide<T> | RelationOptions<T>, options?: RelationOptions<T>): PropertyDecorator;
export {};
