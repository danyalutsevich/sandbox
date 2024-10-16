import { IInvite, IInviteResendInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { InviteDTO } from "./invite.dto";
declare const ResendInviteDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Pick<InviteDTO, "callbackUrl" | "inviteType">>;
/**
 * Resend invite DTO validation
 */
export declare class ResendInviteDTO extends ResendInviteDTO_base implements IInviteResendInput {
    readonly inviteId: IInvite['id'];
}
export {};
