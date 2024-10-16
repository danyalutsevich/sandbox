import { Cascade, EntityName, ManyToManyOptions } from "@mikro-orm/core";
import { MikroORMInverseSide, TypeORMInverseSide, TypeORMRelationOptions, TypeORMTarget } from "./shared-types";
/**
 * Interface for options used in mapping Many-to-Many relationships in MikroORM.
 *
 */
export interface MapManyToManyArgsForMikroORMOptions<T, O> {
    typeFunctionOrTarget: TargetEntity<T>;
    inverseSide?: InverseSide<T>;
    options?: RelationOptions<T>;
}
type MikroORMTarget<T, O> = ManyToManyOptions<T, O> | string | ((e?: any) => EntityName<T>);
type MikroORMRelationOptions<T, O> = Partial<Omit<ManyToManyOptions<T, O>, 'cascade' | 'onCreate' | 'onUpdate'>>;
type TargetEntity<T> = TypeORMTarget<T> | MikroORMTarget<T, any>;
type InverseSide<T> = TypeORMInverseSide<T> & MikroORMInverseSide<T>;
type RelationOptions<T> = MikroORMRelationOptions<T, any> & TypeORMRelationOptions & {
    cascade?: Cascade[] | (boolean | ("update" | "insert" | "remove" | "soft-remove" | "recover")[]);
};
/**
 * Decorator for defining Many-to-Many relationships in both TypeORM and MikroORM.
 *
 * @param typeFunctionOrTarget - Type or target function for the related entity.
 * @param inverseSide - Inverse side of the relationship or additional options.
 * @param options - Additional options for the Many-to-Many relationship.
 * @returns PropertyDecorator
 */
export declare function MultiORMManyToMany<T>(typeFunctionOrTarget: TargetEntity<T>, inverseSide?: InverseSide<T> | RelationOptions<T>, options?: RelationOptions<T>): PropertyDecorator;
export {};
