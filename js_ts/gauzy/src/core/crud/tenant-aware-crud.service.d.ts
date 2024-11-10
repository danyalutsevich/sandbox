import { DeleteResult, FindOptionsWhere, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination } from '../../../plugins/contracts';
import { MikroOrmBaseEntityRepository } from '../../core/repository/mikro-orm-base-entity.repository';
import { TenantBaseEntity } from '../entities/internal';
import { CrudService } from './crud.service';
import { ICrudService, IPartialEntity } from './icrud.service';
import { ITryRequest } from './try-request';
/**
 * This abstract class adds tenantId to all query filters if a user is available in the current RequestContext
 * If a user is not available in RequestContext, then it behaves exactly the same as CrudService
 */
export declare abstract class TenantAwareCrudService<T extends TenantBaseEntity> extends CrudService<T> implements ICrudService<T> {
    constructor(typeOrmRepository: Repository<T>, mikroOrmRepository: MikroOrmBaseEntityRepository<T>);
    /**
     * Define find conditions when retrieving data with employee by user.
     *
     * @returns The find conditions based on the current user's relationship with employees.
     */
    private findConditionsWithEmployeeByUser;
    /**
     * Define find conditions when retrieving data with tenant by user.
     *
     * @param user - The user for whom the conditions are defined.
     * @returns The find conditions based on the user's relationship with the tenant and employees.
     */
    private findConditionsWithTenantByUser;
    /**
     * Define find conditions when retrieving data with tenant.
     *
     * @param user - The user for whom the conditions are defined.
     * @param where - Additional find options.
     * @returns The find conditions based on the user's relationship with the tenant and additional options.
     */
    private findConditionsWithTenant;
    /**
     * Define find one options when retrieving data with tenant.
     *
     * @param filter - Additional find options.
     * @returns The find one options based on the current user's relationship with the tenant and additional options.
     */
    private findOneWithTenant;
    /**
     * Define find many options when retrieving data with tenant.
     *
     * @param filter - Additional find options.
     * @returns The find many options based on the current user's relationship with the tenant and additional options.
     */
    private findManyWithTenant;
    /**
     * Counts entities that match given options.
     * Useful for pagination.
     *
     * @param options
     * @returns
     */
    count(options?: FindManyOptions<T>): Promise<number>;
    countFast(): Promise<number>;
    /**
     * Counts entities that match given options.
     * Useful for pagination.
     *
     * @param options
     * @returns
     */
    countBy(options?: FindOptionsWhere<T>): Promise<number>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     *
     * @param filter
     * @returns
     */
    findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>>;
    /**
     * Finds entities that match given find options.
     *
     * @param filter
     * @returns
     */
    find(filter?: FindManyOptions<T>): Promise<T[]>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * But includes pagination settings
     *
     * @param filter
     * @returns
     */
    paginate(filter?: FindManyOptions<T>): Promise<IPagination<T>>;
    /**
     * Finds first entity by a given find options with current tenant.
     * If entity was not found in the database - rejects with error.
     *
     * @param id
     * @param options
     * @returns
     */
    findOneOrFailByIdString(id: T['id'], options?: FindOneOptions<T>): Promise<ITryRequest<T>>;
    /**
     * Finds first entity that matches given options with current tenant.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    findOneOrFailByOptions(options?: FindOneOptions<T>): Promise<ITryRequest<T>>;
    /**
     * Finds first entity that matches given where condition with current tenant.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    findOneOrFailByWhereOptions(options: FindOptionsWhere<T>): Promise<ITryRequest<T>>;
    /**
     * Finds first entity by a given find options with current tenant.
     * If entity was not found in the database - returns null.
     *
     * @param id
     * @param options
     * @returns
     */
    findOneByIdString(id: T['id'], options?: FindOneOptions<T>): Promise<T>;
    /**
     * Finds first entity that matches given options with current tenant.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    findOneByOptions(options: FindOneOptions<T>): Promise<T>;
    /**
     * Finds first entity that matches given where condition with current tenant.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    findOneByWhereOptions(options: FindOptionsWhere<T>): Promise<T>;
    /**
     * Creates a new entity instance and copies all entity properties from this object into a new entity.
     * Note that it copies only properties that are present in entity schema.
     *
     * @param entity
     * @returns
     */
    create(entity: IPartialEntity<T>): Promise<T>;
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
     *
     * @param id
     * @param partialEntity
     * @returns
     */
    update(id: string | FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<T | UpdateResult>;
    /**
     * DELETE source related to tenant
     *
     * @param criteria - A string ID or a set of conditions to identify which record to delete.
     * @param options - Additional options for querying, such as extra conditions or query parameters.
     * @returns {Promise<DeleteResult>} - The result of the delete operation.
     */
    delete(criteria: string | FindOptionsWhere<T>, options?: FindOneOptions<T>): Promise<DeleteResult>;
    /**
     * Softly deletes entities by a given criteria.
     * This method sets a flag or timestamp indicating the entity is considered deleted.
     * It does not actually remove the entity from the database, allowing for recovery or audit purposes.
     *
     * @param criteria - Entity ID or complex query to identify which entity to soft-delete.
     * @param options - Additional options for the operation.
     * @returns {Promise<DeleteResult>} - Result indicating success or failure.
     */
    softDelete(criteria: string | number | FindOptionsWhere<T>, options?: FindOneOptions<T>): Promise<UpdateResult | T>;
}
