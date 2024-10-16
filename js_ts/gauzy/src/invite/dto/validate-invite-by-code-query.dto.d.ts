import { IUserCodeInput, IUserEmailInput } from '../../../plugins/contracts';
import { UserCodeDTO, UserEmailDTO } from "./../../user/dto";
declare const ValidateInviteByCodeQueryDTO_base: import("@nestjs/common").Type<UserEmailDTO & UserCodeDTO>;
/**
 * Validate invite by code DTO validation
 */
export declare class ValidateInviteByCodeQueryDTO extends ValidateInviteByCodeQueryDTO_base implements IUserEmailInput, IUserCodeInput {
}
export {};
