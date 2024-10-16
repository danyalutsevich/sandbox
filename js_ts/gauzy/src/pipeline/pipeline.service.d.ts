import { FindManyOptions, FindOptionsWhere, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IDeal, IPagination, IPipeline } from '../../plugins/contracts/dist/index';
import { ConnectionEntityManager } from '../database/connection-entity-manager';
import { Pipeline } from './pipeline.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmDealRepository } from '../deal/repository';
import { TypeOrmUserRepository } from '../user/repository';
import { MikroOrmPipelineRepository, TypeOrmPipelineRepository } from './repository';
export declare class PipelineService extends TenantAwareCrudService<Pipeline> {
    private readonly typeOrmPipelineRepository;
    private readonly mikroOrmPipelineRepository;
    private readonly typeOrmDealRepository;
    private readonly typeOrmUserRepository;
    private readonly _connectionEntityManager;
    constructor(typeOrmPipelineRepository: TypeOrmPipelineRepository, mikroOrmPipelineRepository: MikroOrmPipelineRepository, typeOrmDealRepository: TypeOrmDealRepository, typeOrmUserRepository: TypeOrmUserRepository, _connectionEntityManager: ConnectionEntityManager);
    findDeals(pipelineId: string): Promise<{
        items: IDeal[];
        total: number;
    }>;
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string | number | FindOptionsWhere<Pipeline>, entity: QueryDeepPartialEntity<Pipeline>): Promise<UpdateResult | Pipeline>;
    /**
     * Perform pagination with filtering based on the provided options.
     *
     * @param filter - The filtering options.
     * @returns The paginated result.
     */
    pagination(filter: FindManyOptions): Promise<IPagination<IPipeline>>;
}
