import { IEquipmentSharing, IGoal, IImageAsset, IIssueType, IOrganizationProject, IOrganizationTeam, IOrganizationTeamEmployee, IRequestApprovalTeam, ITag, ITask, ITaskPriority, ITaskRelatedIssueType, ITaskSize, ITaskStatus, ITaskVersion, IUser } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationTeam extends TenantOrganizationBaseEntity implements IOrganizationTeam {
    /**
     * Team name
     */
    name: string;
    /**
     * Team color (optional)
     */
    color?: string;
    /**
     * Team emoji (optional)
     */
    emoji?: string;
    /**
     * Optional property representing the team size.
     */
    teamSize?: string;
    /**
     * Optional property representing the logo of the organization team.
     */
    logo?: string;
    /**
     * Optional property representing the prefix for the organization team.
     */
    prefix?: string;
    /**
     * Optional property representing the team sharing profile views between employees
     * Default value is set to true
     */
    shareProfileView?: boolean;
    /**
     * Optional property representing the team time tracking required by existing of a daily plan
     * Default value is set to false
     */
    requirePlanToTrack?: boolean;
    /**
     * Optional property representing the team type (boolean true/false).
     * Default value is set to false.
     */
    public?: boolean;
    /**
     * Optional property representing the profile link for the organization team.
     */
    profile_link?: string;
    /**
     * User
     */
    createdBy?: IUser;
    createdById?: IUser['id'];
    /**
     * ImageAsset
     */
    image?: IImageAsset;
    imageId?: IImageAsset['id'];
    /**
     * OrganizationTeamEmployee
     */
    members?: IOrganizationTeamEmployee[];
    /**
     * RequestApprovalTeam
     */
    requestApprovals?: IRequestApprovalTeam[];
    /**
     * Goal
     */
    goals?: IGoal[];
    /**
     * Team Statuses
     */
    statuses?: ITaskStatus[];
    /**
     * Team Related Status type
     */
    relatedIssueTypes?: ITaskRelatedIssueType[];
    /**
     * Team Priorities
     */
    priorities?: ITaskPriority[];
    /**
     * Team Sizes
     */
    sizes?: ITaskSize[];
    /**
     * Team Versions
     */
    versions?: ITaskVersion[];
    /**
     * Team Labels
     */
    labels?: ITag[];
    /**
     * Team Issue Types
     */
    issueTypes?: IIssueType[];
    tags?: ITag[];
    /**
     * Task
     */
    tasks?: ITask[];
    /**
     * Equipment Sharing
     */
    equipmentSharings?: IEquipmentSharing[];
    /**
     * Organization Project
     */
    projects?: IOrganizationProject[];
}
