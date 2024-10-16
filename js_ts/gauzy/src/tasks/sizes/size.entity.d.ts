import { IOrganizationProject, IOrganizationTeam, ITaskSize } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class TaskSize extends TenantOrganizationBaseEntity implements ITaskSize {
    name: string;
    value: string;
    description?: string;
    icon?: string;
    color?: string;
    isSystem?: boolean;
    /** Additional virtual columns */
    fullIconUrl?: string;
    /**
     * Organization Project Relationship
     */
    project?: IOrganizationProject;
    projectId?: IOrganizationProject['id'];
    /**
     * Organization Team Relationship
     */
    organizationTeam?: IOrganizationTeam;
    /**
     * Organization Team ID
     */
    organizationTeamId?: IOrganizationTeam['id'];
}
