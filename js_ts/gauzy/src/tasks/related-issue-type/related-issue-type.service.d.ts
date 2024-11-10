import { DeleteResult } from 'typeorm';
import { Knex as KnexConnection } from 'knex';
import { IOrganization, IPagination, ITaskRelatedIssueType, ITaskRelatedIssueTypeCreateInput, ITaskRelatedIssueTypeFindInput } from '../../../plugins/contracts';
import { TaskStatusPrioritySizeService } from '../task-status-priority-size.service';
import { TaskRelatedIssueType } from './related-issue-type.entity';
import { TypeOrmTaskRelatedIssueTypeRepository } from './repository/type-orm-related-issue-type.repository';
import { MikroOrmTaskRelatedIssueTypeRepository } from './repository/mikro-orm-related-issue-type.repository';
export declare class TaskRelatedIssueTypeService extends TaskStatusPrioritySizeService<TaskRelatedIssueType> {
    readonly typeOrmTaskRelatedIssueTypeRepository: TypeOrmTaskRelatedIssueTypeRepository;
    readonly mikroOrmTaskRelatedIssueTypeRepository: MikroOrmTaskRelatedIssueTypeRepository;
    readonly knexConnection: KnexConnection;
    constructor(typeOrmTaskRelatedIssueTypeRepository: TypeOrmTaskRelatedIssueTypeRepository, mikroOrmTaskRelatedIssueTypeRepository: MikroOrmTaskRelatedIssueTypeRepository, knexConnection: KnexConnection);
    /**
     * GET statuses by filters
     * If parameters not match, retrieve global statuses
     *
     * @param params
     * @returns
     */
    fetchAll(params: ITaskRelatedIssueTypeFindInput): Promise<IPagination<TaskRelatedIssueType>>;
    /**
     * Few RelatedIssueTypes can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    delete(id: ITaskRelatedIssueType['id']): Promise<DeleteResult>;
    /**
     * Create bulk statuses for specific organization
     *
     * @param organization
     */
    bulkCreateOrganizationRelatedIssueTypes(organization: IOrganization): Promise<ITaskRelatedIssueType[] & TaskRelatedIssueType[]>;
    /**
     * Create bulk statuses for specific organization entity
     *
     * @param entity
     * @returns
     */
    createBulkRelatedIssueTypesByEntity(entity: Partial<ITaskRelatedIssueTypeCreateInput>): Promise<ITaskRelatedIssueType[]>;
}
