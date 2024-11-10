import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IDeal, IPagination, IPipeline } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { Pipeline } from './pipeline.entity';
import { PipelineService } from './pipeline.service';
export declare class PipelineController extends CrudController<Pipeline> {
    protected readonly pipelineService: PipelineService;
    constructor(pipelineService: PipelineService);
    /**
     * Paginate sales pipelines with permissions, validation, and filtering options.
     *
     * @param filter - The filtering options for pagination.
     * @returns The paginated result of sales pipelines.
     */
    pagination(filter: PaginationParams<Pipeline>): Promise<IPagination<IPipeline>>;
    /**
     * Find all sales pipelines with permissions, API documentation, and query parameter parsing.
     *
     * @param data - The query parameter data.
     * @returns A paginated result of sales pipelines.
     */
    findAll(filter: PaginationParams<Pipeline>): Promise<IPagination<IPipeline>>;
    /**
     * Find deals for a specific sales pipeline with permissions, API documentation, and parameter validation.
     *
     * @param id - The identifier of the sales pipeline.
     * @returns A paginated result of deals for the specified sales pipeline.
     */
    findDeals(id: string): Promise<IPagination<IDeal>>;
    /**
     * Create a new record with permissions, API documentation, and HTTP status codes.
     *
     * @param entity - The data to create a new record.
     * @returns The created record.
     */
    create(entity: DeepPartial<Pipeline>): Promise<IPipeline>;
    /**
     * Update an existing record with permissions, API documentation, and HTTP status codes.
     *
     * @param id - The identifier of the record to update.
     * @param entity - The data to update the existing record.
     * @param options - Additional options if needed.
     * @returns The updated record.
     */
    update(id: string, entity: QueryDeepPartialEntity<Pipeline>): Promise<any>;
    /**
     * Delete a record with permissions, API documentation, and HTTP status codes.
     *
     * @param id - The identifier of the record to delete.
     * @param options - Additional options if needed.
     * @returns The result of the deletion operation.
     */
    delete(id: string): Promise<any>;
}
