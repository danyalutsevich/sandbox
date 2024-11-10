import { Repository as TypeOrmBaseEntityRepository, SelectQueryBuilder } from 'typeorm';
import { Knex as KnexConnection } from 'knex';
import { IIssueTypeFindInput, IPagination, ITaskPriorityFindInput, ITaskSizeFindInput, ITaskStatusFindInput, ITaskVersionFindInput } from '../../plugins/contracts/dist/index';
import { MikroOrmBaseEntityRepository } from '../core/repository/mikro-orm-base-entity.repository';
import { TenantAwareCrudService } from '../core/crud';
import { TenantBaseEntity } from '../core/entities/internal';
export type FindEntityByParams = ITaskStatusFindInput | ITaskPriorityFindInput | ITaskSizeFindInput | IIssueTypeFindInput | ITaskVersionFindInput;
export declare class TaskStatusPrioritySizeService<BaseEntity extends TenantBaseEntity> extends TenantAwareCrudService<BaseEntity> {
    readonly typeOrmBaseEntityRepository: TypeOrmBaseEntityRepository<BaseEntity>;
    readonly mikroOrmBaseEntityRepository: MikroOrmBaseEntityRepository<BaseEntity>;
    readonly knexConnection: KnexConnection;
    constructor(typeOrmBaseEntityRepository: TypeOrmBaseEntityRepository<BaseEntity>, mikroOrmBaseEntityRepository: MikroOrmBaseEntityRepository<BaseEntity>, knexConnection: KnexConnection);
    /**
     * Fetch entities based on specified parameters using Knex.js.
     * @param input - Parameters for finding entities (IFindEntityByParams).
     * @returns A Promise resolving to an object with items and total count.
     */
    fetchAllByKnex(input: FindEntityByParams): Promise<IPagination<BaseEntity>>;
    /**
     * Retrieves entities based on the provided parameters.
     *
     * @param params - Parameters for filtering (IFindEntityByParams).
     * @returns A Promise that resolves to an object conforming to the IPagination interface.
     */
    fetchAll(params: FindEntityByParams): Promise<IPagination<BaseEntity>>;
    /**
     * Retrieves default entities based on certain criteria.
     * @returns A promise resolving to an object containing items and total count.
     */
    getDefaultEntities(): Promise<IPagination<BaseEntity>>;
    /**
     * GET status filter query
     *
     * @param query
     * @param request
     * @returns
     */
    getFilterQuery(query: SelectQueryBuilder<BaseEntity>, request: FindEntityByParams): SelectQueryBuilder<BaseEntity>;
    /**
     * Creates a Knex query builder for a specific table.
     * @param knex - Knex connection instance.
     * @returns A Knex query builder for the specified table.
     */
    createKnexQueryBuilder(knex: KnexConnection): KnexConnection.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    /**
     * Retrieves a single entity or fails if none is found using a Knex query.
     * @param knex - Knex connection instance.
     * @param request - Request parameters for filtering (IFindEntityByParams).
     * @returns A Promise that resolves to the first entity or rejects if none is found.
     */
    getOneOrFailByKnex(request: FindEntityByParams): Promise<BaseEntity | undefined>;
    /**
     * Retrieves entities and their count using a Knex query.
     * @param knex - Knex connection instance.
     * @param request - Request parameters for filtering (IFindEntityByParams).
     * @returns A Knex query builder with applied filters.
     */
    getManyAndCountByKnex(request: FindEntityByParams): Promise<KnexConnection.QueryBuilder<any, any>>;
    /**
     * Retrieves default entities using a Knex query.
     * @returns A Promise that resolves to an object conforming to the IPagination interface.
     */
    getDefaultEntitiesByKnex(): Promise<IPagination<BaseEntity>>;
    /**
     * Builds a filter query for a Knex query builder based on the provided parameters.
     * @param qb - Knex query builder.
     * @param request - Request parameters for filtering (IFindEntityByParams).
     */
    getFilterQueryByKnex(qb: KnexConnection.QueryBuilder<any, any>, request: FindEntityByParams): void;
}
