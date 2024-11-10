import { IPagination } from '../../../plugins/contracts';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/internal';
import { ICrudService } from './icrud.service';
import { PaginationParams } from './pagination-params';
export declare abstract class CrudController<T extends BaseEntity> {
    private readonly crudService;
    protected constructor(crudService: ICrudService<T>);
    /**
     * Get the total count of all records.
     *
     * This endpoint retrieves the total count of all records for the given entity.
     *
     * @param options Optional query options for filtering records.
     * @returns A promise resolving to the count of all records.
     */
    getCount(options?: FindOptionsWhere<T>): Promise<number | void>;
    /**
     * Get a paginated list of records.
     *
     * This endpoint retrieves a paginated list of records for the given entity.
     *
     * @param filter Optional filter parameters for pagination.
     * @returns A promise resolving to a paginated list of records.
     */
    pagination(filter?: PaginationParams<T>, ...options: any[]): Promise<IPagination<T> | void>;
    /**
     * Get all records.
     *
     * This endpoint retrieves all records for the given entity without pagination.
     *
     * @param filter Optional filter parameters for retrieval.
     * @returns A promise resolving to all records.
     */
    findAll(filter?: PaginationParams<T>, ...options: any[]): Promise<IPagination<T>>;
    /**
     * Get a record by ID.
     *
     * This endpoint retrieves a specific record by its ID.
     *
     * @param id The ID of the record to find.
     * @returns A promise resolving to the found record.
     */
    findById(id: T['id'], ...options: any[]): Promise<T>;
    /**
     * Create a new record.
     *
     * This endpoint creates a new record for the given entity type.
     *
     * @param entity The data for the new record.
     * @returns A promise resolving to the created record.
     */
    create(entity: DeepPartial<T>, ...options: any[]): Promise<T>;
    /**
     * Update an existing record.
     *
     * This endpoint updates an existing record based on its ID and the given data.
     *
     * @param id The ID of the record to update.
     * @param entity The data to update the record with.
     * @returns A promise resolving to the updated record.
     */
    update(id: string, entity: QueryDeepPartialEntity<T>, ...options: any[]): Promise<any>;
    /**
     * Delete a record.
     *
     * This endpoint deletes a specific record based on its ID.
     *
     * @param id The ID of the record to delete.
     * @returns A promise resolving to the result of the delete operation.
     */
    delete(id: string, ...options: any[]): Promise<any>;
    /**
     * Soft deletes a record by ID.
     *
     * This endpoint marks a record as deleted without physically removing it from the database.
     * The soft-deleted record can be restored later.
     *
     * @param id The ID of the record to soft delete.
     * @returns The soft-deleted record.
     */
    softRemove(id: T['id'], ...options: any[]): Promise<T>;
    /**
     * Restores a soft-deleted record by ID.
     *
     * This endpoint restores a record that was previously soft-deleted,
     * allowing it to be used again in the application.
     *
     * @param id The ID of the record to restore.
     * @returns The restored record.
     */
    softRecover(id: T['id'], ...options: any[]): Promise<T>;
}
