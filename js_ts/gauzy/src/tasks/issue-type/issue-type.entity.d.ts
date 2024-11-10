import { IImageAsset, IIssueType, IOrganizationProject, IOrganizationTeam } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class IssueType extends TenantOrganizationBaseEntity implements IIssueType {
    name: string;
    value: string;
    description?: string;
    icon?: string;
    color?: string;
    isDefault?: boolean;
    isSystem?: boolean;
    /** Additional virtual columns */
    fullIconUrl?: string;
    /**
     * Image Asset
     */
    image?: IImageAsset;
    imageId?: IImageAsset['id'];
    /**
     * Organization Project
     */
    project?: IOrganizationProject;
    projectId?: IOrganizationProject['id'];
    /**
     * Organization Team
     */
    organizationTeam?: IOrganizationTeam;
    organizationTeamId?: IOrganizationTeam['id'];
}
