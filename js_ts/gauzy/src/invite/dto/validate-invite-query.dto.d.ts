import { IUserEmailInput, IUserTokenInput } from '../../../plugins/contracts';
import { UserEmailDTO, UserTokenDTO } from "../../user/dto";
declare const ValidateInviteQueryDTO_base: import("@nestjs/common").Type<UserEmailDTO & UserTokenDTO>;
/**
 * Invite validate DTO request validation
 */
export declare class ValidateInviteQueryDTO extends ValidateInviteQueryDTO_base implements IUserEmailInput, IUserTokenInput {
}
export {};
