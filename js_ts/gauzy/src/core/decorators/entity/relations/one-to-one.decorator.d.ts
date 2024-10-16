import { Cascade, EntityName, OneToOneOptions } from "@mikro-orm/core";
import { MikroORMInverseSide, TypeORMInverseSide, TypeORMRelationOptions, TypeORMTarget, TypeOrmCascadeOption } from "./shared-types";
/**
 * Options for mapping OneToOne relationship arguments for MikroORM.
 *
 * @template T - The type of the target entity.
 * @template O - The type of additional options.
 */
export interface MapOneToOneArgsForMikroORMOptions<T, O> {
    typeFunctionOrTarget: TargetEntity<T>;
    inverseSideOrOptions?: InverseSide<T>;
    options?: RelationOptions<T, O>;
    propertyKey?: string;
    target?: string;
}
type MikroORMTarget<T, O> = OneToOneOptions<T, O> | string | ((e?: any) => EntityName<T>);
type MikroORMRelationOptions<T, O> = Omit<Partial<OneToOneOptions<T, O>>, 'cascade'>;
type TargetEntity<T> = TypeORMTarget<T> | MikroORMTarget<T, any>;
type InverseSide<T> = TypeORMInverseSide<T> & MikroORMInverseSide<T>;
type RelationOptions<T, O> = MikroORMRelationOptions<T, O> & TypeORMRelationOptions & {
    cascade?: Cascade[] | TypeOrmCascadeOption;
};
/**
 * Decorator for defining One-to-One relationships in both TypeORM and MikroORM.
 *
 * @param typeFunctionOrTarget - Type or target function for the related entity.
 * @param inverseSideOrOptions - Inverse side of the relationship or additional options.
 * @param options - Additional options for the One-to-One relationship.
 * @returns PropertyDecorator
 */
export declare function MultiORMOneToOne<T, O>(typeFunctionOrTarget: TargetEntity<T>, inverseSideOrOptions?: InverseSide<T> | RelationOptions<T, O>, options?: RelationOptions<T, O>): PropertyDecorator;
/**
 * Maps TypeORM OneToOne relation options to MikroORM options for MikroORM integration with TypeORM.
 *
 * @param param0 - Destructured parameters object.
 * @returns MikroORMRelationOptions - The mapped MikroORM relation options.
 */
export declare function mapOneToOneArgsForMikroORM<T, O>({ typeFunctionOrTarget, inverseSideOrOptions, options, propertyKey }: MapOneToOneArgsForMikroORMOptions<T, O>): MikroORMRelationOptions<any, any>;
export {};
