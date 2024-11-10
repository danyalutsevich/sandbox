import { IOrganizationTeam, IOrganizationTeamJoinRequest, IUser, OrganizationTeamJoinRequestStatusEnum } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationTeamJoinRequest extends TenantOrganizationBaseEntity implements IOrganizationTeamJoinRequest {
    email: string;
    fullName: string;
    linkAddress: string;
    position: string;
    status: OrganizationTeamJoinRequestStatusEnum;
    code: string;
    token: string;
    expiredAt: Date;
    /** Additional virtual columns */
    isExpired: boolean;
    /**
     * Join request belongs to user
     */
    user?: IUser;
    userId?: IUser['id'];
    /**
     * Join request belongs to organization team
     */
    organizationTeam?: IOrganizationTeam;
    organizationTeamId?: IOrganizationTeam['id'];
}
