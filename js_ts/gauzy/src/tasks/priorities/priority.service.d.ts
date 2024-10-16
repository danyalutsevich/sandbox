import { DeleteResult } from 'typeorm';
import { Knex as KnexConnection } from 'knex';
import { IOrganization, IPagination, ITaskPriority, ITaskPriorityCreateInput, ITaskPriorityFindInput, ITenant } from '../../../plugins/contracts';
import { TaskStatusPrioritySizeService } from '../task-status-priority-size.service';
import { TaskPriority } from './priority.entity';
import { MikroOrmTaskPriorityRepository } from './repository/mikro-orm-task-priority.repository';
import { TypeOrmTaskPriorityRepository } from './repository/type-orm-task-priority.repository';
export declare class TaskPriorityService extends TaskStatusPrioritySizeService<TaskPriority> {
    readonly typeOrmTaskPriorityRepository: TypeOrmTaskPriorityRepository;
    readonly mikroOrmTaskPriorityRepository: MikroOrmTaskPriorityRepository;
    readonly knexConnection: KnexConnection;
    constructor(typeOrmTaskPriorityRepository: TypeOrmTaskPriorityRepository, mikroOrmTaskPriorityRepository: MikroOrmTaskPriorityRepository, knexConnection: KnexConnection);
    /**
     * Few task priorities can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    delete(id: ITaskPriority['id']): Promise<DeleteResult>;
    /**
     * GET priorities by filters
     * If parameters not match, retrieve global task priorities
     *
     * @param params
     * @returns
     */
    fetchAll(params: ITaskPriorityFindInput): Promise<IPagination<ITaskPriority>>;
    /**
     * Create bulk task priorities for tenants
     *
     * @param tenants '
     */
    bulkCreateTenantsTaskPriorities(tenants: ITenant[]): Promise<ITaskPriority[]>;
    /**
     * Create bulk task priorities for organization
     *
     * @param organization
     */
    bulkCreateOrganizationTaskPriorities(organization: IOrganization): Promise<ITaskPriority[]>;
    /**
     * Create bulk task priorities for specific organization entity
     *
     * @param entity
     * @returns
     */
    createBulkPrioritiesByEntity(entity: Partial<ITaskPriorityCreateInput>): Promise<ITaskPriority[]>;
}
