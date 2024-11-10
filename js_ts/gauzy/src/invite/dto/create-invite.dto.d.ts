import { ICreateEmailInvitesInput } from '../../../plugins/contracts';
import { RoleFeatureDTO } from "./../../role/dto";
import { InviteDTO } from "./invite.dto";
declare const CreateInviteDTO_base: import("@nestjs/common").Type<RoleFeatureDTO & InviteDTO>;
/**
 * Create Invite DTO validation
 */
export declare class CreateInviteDTO extends CreateInviteDTO_base implements ICreateEmailInvitesInput {
}
export {};
