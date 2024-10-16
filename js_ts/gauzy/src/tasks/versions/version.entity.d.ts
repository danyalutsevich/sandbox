import { IOrganizationProject, IOrganizationTeam, ITaskVersion } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from '../../core/entities/internal';
export declare class TaskVersion extends TenantOrganizationBaseEntity implements ITaskVersion {
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
    /**
     * Organization Project ID
     */
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
