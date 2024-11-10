import { IInvite, InviteStatusEnum, IOrganizationDepartment, IOrganizationContact, IOrganizationProject, IUser, IRole, IOrganizationTeam } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Invite extends TenantOrganizationBaseEntity implements IInvite {
    token: string;
    email: string;
    status: InviteStatusEnum;
    expireDate: Date;
    actionDate?: Date;
    code?: string;
    fullName?: string;
    isExpired?: boolean;
    /**
     * Invited By User
     */
    invitedBy?: IUser;
    invitedById: string;
    /**
     * Invited User Role
     */
    role?: IRole;
    roleId: string;
    /**
     * Invites belongs to user
     */
    user?: IUser;
    userId?: IUser['id'];
    /**
     * Organization Projects
     */
    projects?: IOrganizationProject[];
    /**
     * Organization Contacts
     */
    organizationContacts?: IOrganizationContact[];
    /**
     * Organization Departments
     */
    departments?: IOrganizationDepartment[];
    /**
    * Organization Teams
    */
    teams?: IOrganizationTeam[];
}
