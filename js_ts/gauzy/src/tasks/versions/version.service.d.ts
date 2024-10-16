import { DeleteResult } from 'typeorm';
import { Knex as KnexConnection } from 'knex';
import { IOrganization, IPagination, ITaskVersion, ITaskVersionCreateInput, ITaskVersionFindInput, ITenant } from '../../../plugins/contracts';
import { TaskStatusPrioritySizeService } from '../task-status-priority-size.service';
import { TaskVersion } from './version.entity';
import { MikroOrmTaskVersionRepository } from './repository/mikro-orm-task-version.repository';
import { TypeOrmTaskVersionRepository } from './repository/type-orm-task-version.repository';
export declare class TaskVersionService extends TaskStatusPrioritySizeService<TaskVersion> {
    readonly typeOrmTaskVersionRepository: TypeOrmTaskVersionRepository;
    readonly mikroOrmTaskVersionRepository: MikroOrmTaskVersionRepository;
    readonly knexConnection: KnexConnection;
    constructor(typeOrmTaskVersionRepository: TypeOrmTaskVersionRepository, mikroOrmTaskVersionRepository: MikroOrmTaskVersionRepository, knexConnection: KnexConnection);
    /**
     * GET versions by filters
     * If parameters not match, retrieve global versions
     *
     * @param params
     * @returns
     */
    fetchAll(params: ITaskVersionFindInput): Promise<IPagination<TaskVersion>>;
    /**
     * Few Versions can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    delete(id: ITaskVersion['id']): Promise<DeleteResult>;
    /**
     * Create bulk versions for specific tenants
     *
     * @param tenants '
     */
    bulkCreateTenantsVersions(tenants: ITenant[]): Promise<ITaskVersion[] & TaskVersion[]>;
    /**
     * Create bulk versions for specific organization
     *
     * @param organization
     */
    bulkCreateOrganizationVersions(organization: IOrganization): Promise<ITaskVersion[] & TaskVersion[]>;
    /**
     * Create bulk versions for specific organization entity
     *
     * @param entity
     * @returns
     */
    createBulkVersionsByEntity(entity: Partial<ITaskVersionCreateInput>): Promise<ITaskVersion[]>;
}
