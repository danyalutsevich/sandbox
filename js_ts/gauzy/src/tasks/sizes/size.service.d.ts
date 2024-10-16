import { DeleteResult } from 'typeorm';
import { Knex as KnexConnection } from 'knex';
import { IOrganization, IPagination, ITaskSize, ITaskSizeCreateInput, ITaskSizeFindInput, ITenant } from '../../../plugins/contracts';
import { TaskStatusPrioritySizeService } from '../task-status-priority-size.service';
import { TaskSize } from './size.entity';
import { TypeOrmTaskSizeRepository } from './repository/type-orm-task-size.repository';
import { MikroOrmTaskSizeRepository } from './repository/mikro-orm-task-size.repository';
export declare class TaskSizeService extends TaskStatusPrioritySizeService<TaskSize> {
    readonly typeOrmTaskSizeRepository: TypeOrmTaskSizeRepository;
    readonly mikroOrmTaskSizeRepository: MikroOrmTaskSizeRepository;
    readonly knexConnection: KnexConnection;
    constructor(typeOrmTaskSizeRepository: TypeOrmTaskSizeRepository, mikroOrmTaskSizeRepository: MikroOrmTaskSizeRepository, knexConnection: KnexConnection);
    /**
     * Few task sizes can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    delete(id: ITaskSize['id']): Promise<DeleteResult>;
    /**
     * Find task sizes based on the provided parameters.
     * @param params - The input parameters for the task size search.
     * @returns {Promise<IPagination<ITaskSize>>} A promise resolving to the paginated list of task sizes.
     * @throws {HttpException} Thrown if there's an issue with the request parameters, such as missing or unauthorized integration.
     */
    fetchAll(params: ITaskSizeFindInput): Promise<IPagination<ITaskSize>>;
    /**
     * Create bulk task sizes for tenants
     *
     * @param tenants
     */
    bulkCreateTenantsTaskSizes(tenants: ITenant[]): Promise<ITaskSize[]>;
    /**
     * Create bulk task sizes for organization
     *
     * @param organization
     */
    bulkCreateOrganizationTaskSizes(organization: IOrganization): Promise<ITaskSize[]>;
    /**
     * Create bulk task sizes for specific organization entity
     *
     * @param entity
     * @returns
     */
    createBulkSizesByEntity(entity: Partial<ITaskSizeCreateInput>): Promise<ITaskSize[]>;
}
