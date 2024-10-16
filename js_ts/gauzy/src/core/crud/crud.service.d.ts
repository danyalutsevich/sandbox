import { DeleteResult, FindManyOptions, FindOptionsWhere, Repository, SaveOptions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateOptions } from '@mikro-orm/core';
import { AssignOptions } from '@mikro-orm/knex';
import { IPagination } from '../../../plugins/contracts';
import { BaseEntity } from '../entities/internal';
import { IQueryBuilder } from '../../core/orm/query-builder/iquery-builder';
import { MikroOrmBaseEntityRepository } from '../../core/repository/mikro-orm-base-entity.repository';
import { MultiORM } from './../../core/utils';
import { ICountByOptions, ICountOptions, ICrudService, IFindManyOptions, IFindOneOptions, IFindWhereOptions, IPartialEntity, IUpdateCriteria } from './icrud.service';
import { ITryRequest } from './try-request';
export declare abstract class CrudService<T extends BaseEntity> implements ICrudService<T> {
    protected readonly typeOrmRepository: Repository<T>;
    protected readonly mikroOrmRepository: MikroOrmBaseEntityRepository<T>;
    constructor(typeOrmRepository: Repository<T>, mikroOrmRepository: MikroOrmBaseEntityRepository<T>);
    /**
     * Get the table name from the repository metadata.
     * @returns {string} The table name.
     */
    get tableName(): string;
    /**
     * Get the ORM type.
     * @returns {MultiORM} The ORM type.
     */
    get ormType(): MultiORM;
    /**
     * Creates an ORM-specific query builder for the repository, supporting MikroORM and TypeORM.
     *
     * @param alias - Optional alias for the primary table in the query.
     * @returns An `IQueryBuilder<T>` instance suitable for the repository's ORM type.
     * @throws Error if the ORM type is not implemented.
     */
    createQueryBuilder(alias?: string): IQueryBuilder<T>;
    /**
     * Count the number of entities based on the provided options.
     *
     * @param options - Options for counting entities.
     * @returns A Promise that resolves to the count of entities.
     */
    count(options?: ICountOptions<T>): Promise<number>;
    /**
     * Counts entities that match given options.
     * Useful for pagination.
     *
     * @param options
     * @returns
     */
    countBy(options?: ICountByOptions<T>): Promise<number>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     *
     * @param options
     * @returns
     */
    findAll(options?: IFindManyOptions<T>): Promise<IPagination<T>>;
    /**
     * Finds entities that match given find options.
     *
     * @param options
     * @returns
     */
    find(options?: IFindManyOptions<T>): Promise<T[]>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * But includes pagination settings
     *
     * @param options
     * @returns
     */
    paginate(options?: FindManyOptions<T>): Promise<IPagination<T>>;
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - rejects with error.
     *
     * @param id
     * @param options
     * @returns
     */
    findOneOrFailByIdString(id: string, options?: IFindOneOptions<T>): Promise<ITryRequest<T>>;
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    findOneOrFailByOptions(options: IFindOneOptions<T>): Promise<ITryRequest<T>>;
    /**
     * Finds first entity that matches given where condition.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    findOneOrFailByWhereOptions(options: IFindWhereOptions<T>): Promise<ITryRequest<T>>;
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - returns null.
     *
     * @param id {string}
     * @param options
     * @returns
     */
    findOneByIdString(id: T['id'], options?: IFindOneOptions<T>): Promise<T>;
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    findOneByOptions(options: IFindOneOptions<T>): Promise<T | null>;
    /**
     * Finds first entity that matches given where condition.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    findOneByWhereOptions(options: IFindWhereOptions<T>): Promise<T | null>;
    /**
     * Creates a new entity or updates an existing one based on the provided entity data.
     *
     * @param entity The partial entity data for creation or update.
     * @param createOptions Options for the creation of the entity in MikroORM.
     * @param upsertOptions Options for the upsert operation in MikroORM.
     * @returns The created or updated entity.
     */
    create(partialEntity: IPartialEntity<T>, createOptions?: CreateOptions<boolean>, assignOptions?: AssignOptions<boolean>): Promise<T>;
    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     *
     * @param entity
     * @returns
     */
    save(entity: IPartialEntity<T>): Promise<T>;
    /**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     *
     * @param id
     * @param partialEntity
     * @returns
     */
    update(id: IUpdateCriteria<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<UpdateResult | T>;
    /**
     * Deletes a record based on the given criteria.
     * Criteria can be an ID (string or number) or a complex object with conditions.
     * Supports multiple ORM types, and throws if the ORM type is unsupported.
     *
     * @param criteria - Identifier or condition to delete specific record(s).
     * @returns {Promise<DeleteResult>} - Result indicating the number of affected records.
     */
    delete(criteria: string | number | FindOptionsWhere<T>): Promise<DeleteResult>;
    /**
     * Softly deletes entities by a given criteria.
     * This method sets a flag or timestamp indicating the entity is considered deleted.
     * It does not actually remove the entity from the database, allowing for recovery or audit purposes.
     *
     * @param criteria - Entity ID or condition to identify which entities to soft-delete.
     * @param options - Additional options for the operation.
     * @returns {Promise<UpdateResult | DeleteResult>} - Result indicating success or failure.
     */
    softDelete(criteria: string | number | FindOptionsWhere<T>): Promise<UpdateResult | T>;
    /**
     * Softly removes an entity from the database.
     *
     * This method handles soft removal of a given entity using different ORM strategies, based on the configured ORM type.
     * - For MikroORM, it uses the `removeAndFlush` method to ensure that the soft deletion is properly persisted.
     * - For TypeORM, it utilizes the `softRemove` method to perform a soft deletion.
     * If the ORM type is not supported, an error is thrown.
     *
     * @param id - The unique identifier of the entity to be softly removed.
     * @param options - Optional parameters for finding the entity (commonly used with TypeORM).
     * @param saveOptions - Additional save options for the ORM operation (specific to TypeORM).
     * @returns A promise that resolves to the softly removed entity.
     */
    softRemove(id: T['id'], options?: IFindOneOptions<T>, saveOptions?: SaveOptions): Promise<T>;
    /**
     * Soft-recover a previously soft-deleted entity.
     *
     * Depending on the ORM, this method restores a soft-deleted entity by resetting its deletion indicator.
     *
     * @param entity - The soft-deleted entity to recover.
     * @param options - Optional settings for database save operations.
     * @returns A promise that resolves with the recovered entity.
     */
    softRecover(id: T['id'], options?: IFindOneOptions<T>, saveOptions?: SaveOptions): Promise<T>;
    /**
     * Ensure related entities are recovered based on the input object and populate options.
     *
     * @param entity - The main entity to which the relations belong.
     * @param mikroOptionsPopulate - Array of relation names to populate and recover.
     * @param repository - The repository used for persistence.
     */
    private ensureRelatedEntitiesRecovered;
    /**
     * Recovers soft-deleted entities within a given MikroORM collection
     * and persists the changes to the database.
     *
     * @param collection - The MikroORM collection to process.
     * @param repository - The repository used to persist changes to the database.
     * @returns The original collection with soft-deleted entities recovered, or undefined if the collection is not initialized.
     */
    private recoverCollections;
    /**
     * Serializes the provided entity based on the ORM type.
     * @param entity The entity to be serialized.
     * @returns The serialized entity.
     */
    protected serialize(entity: T): T;
}
