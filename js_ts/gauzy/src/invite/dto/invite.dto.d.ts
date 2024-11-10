import { InvitationExpirationEnum, InvitationTypeEnum } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './../../core/dto';
/**
 * Invite DTO validation
 */
export declare class InviteDTO extends TenantOrganizationBaseDTO {
    readonly emailIds: string[];
    readonly teamIds: string[];
    readonly inviteType: InvitationTypeEnum;
    readonly startedWorkOn: Date;
    readonly invitationExpirationPeriod: InvitationExpirationEnum;
    readonly fullName: string;
    readonly callbackUrl: string;
}
