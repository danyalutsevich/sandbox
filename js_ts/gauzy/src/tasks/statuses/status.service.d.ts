import { DeleteResult } from 'typeorm';
import { Knex as KnexConnection } from 'knex';
import { IOrganization, IPagination, IReorderDTO, ITaskStatus, ITaskStatusCreateInput, ITaskStatusFindInput, ITenant } from '../../../plugins/contracts';
import { TaskStatusPrioritySizeService } from '../task-status-priority-size.service';
import { TaskStatus } from './status.entity';
import { MikroOrmTaskStatusRepository, TypeOrmTaskStatusRepository } from './repository';
export declare class TaskStatusService extends TaskStatusPrioritySizeService<TaskStatus> {
    readonly typeOrmTaskStatusRepository: TypeOrmTaskStatusRepository;
    readonly mikroOrmTaskStatusRepository: MikroOrmTaskStatusRepository;
    readonly knexConnection: KnexConnection;
    constructor(typeOrmTaskStatusRepository: TypeOrmTaskStatusRepository, mikroOrmTaskStatusRepository: MikroOrmTaskStatusRepository, knexConnection: KnexConnection);
    /**
     * GET statuses by filters
     * If parameters not match, retrieve global statuses
     *
     * @param params
     * @returns
     */
    fetchAll(params: ITaskStatusFindInput): Promise<IPagination<TaskStatus>>;
    /**
     * Few Statuses can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    delete(id: ITaskStatus['id']): Promise<DeleteResult>;
    /**
     * Creates bulk task statuses for specific tenants.
     *
     * @param tenants An array of tenants for whom the task statuses will be created.
     * @returns A promise that resolves to an array of created task statuses.
     */
    bulkCreateTenantsStatus(tenants: ITenant[]): Promise<ITaskStatus[] & TaskStatus[]>;
    /**
     * Creates bulk task statuses for a specific organization.
     *
     * @param organization The organization for which the task statuses will be created.
     * @returns A promise that resolves to an array of created task statuses.
     */
    bulkCreateOrganizationStatus(organization: IOrganization): Promise<ITaskStatus[] & TaskStatus[]>;
    /**
     * Creates bulk task statuses based on the properties of a given entity.
     *
     * @param entity A partial representation of the entity from which properties will be extracted for creating task statuses.
     * @returns A promise that resolves to an array of created task statuses.
     */
    createBulkStatusesByEntity(entity: Partial<ITaskStatusCreateInput>): Promise<ITaskStatus[]>;
    /**
     * Reorders a list of items based on the given ReorderDTO array.
     * @param list - An array of ReorderDTO representing the IDs and their new orders.
     * @returns An object indicating success or failure, along with the updated list.
     * @throws BadRequestException if an error occurs during reordering.
     */
    reorder(list: IReorderDTO[]): Promise<{
        success: boolean;
        list?: IReorderDTO[];
    }>;
}
