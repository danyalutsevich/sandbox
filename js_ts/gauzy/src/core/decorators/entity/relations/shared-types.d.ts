import { ObjectType, RelationOptions as TypeOrmRelationOptions } from 'typeorm';
export type TypeOrmCascadeOption = boolean | ('insert' | 'update' | 'remove' | 'soft-remove' | 'recover');
export type TypeORMTarget<T> = string | ((type?: any) => ObjectType<T>);
export type TypeORMInverseSide<T> = string | ((object: T) => any);
export type TypeORMRelationOptions = Omit<TypeOrmRelationOptions, 'cascade'>;
/**
 * Represents the inverse side of a relationship in MikroORM.
 *
 * This type allows specifying the inverse side as either a string (representing a property name)
 * or a function that takes an object of type `T` and returns the value of the inverse side.
 *
 * @typeparam T - The type of the entity that defines the relationship.
 */
export type MikroORMInverseSide<T> = (string & keyof T) | ((object: T) => any);
