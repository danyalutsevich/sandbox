import { EntityRepositoryType } from '@mikro-orm/knex';
import { IOrganizationProject, IOrganizationTeam, ITaskStatus } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from '../../core/entities/internal';
import { MikroOrmTaskStatusRepository } from './repository';
export declare class TaskStatus extends TenantOrganizationBaseEntity implements ITaskStatus {
    [EntityRepositoryType]?: MikroOrmTaskStatusRepository;
    name: string;
    value: string;
    description?: string;
    order?: number;
    icon?: string;
    color?: string;
    isSystem?: boolean;
    isCollapsed?: boolean;
    /** Additional virtual columns */
    fullIconUrl?: string;
    /**
     * Organization Project Relationship
     */
    project?: IOrganizationProject;
    /**
     * Organization Project ID
     */
    projectId?: IOrganizationProject['id'];
    /**
     * Organization Team
     */
    organizationTeam?: IOrganizationTeam;
    organizationTeamId?: IOrganizationTeam['id'];
}
