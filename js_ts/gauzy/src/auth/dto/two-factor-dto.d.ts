import { IUserCodeInput, IUserEmailInput, IUserTokenInput } from '../../../plugins/contracts';
import { UserCodeDTO, UserEmailDTO, UserTokenDTO } from '../../user/dto';
import { IncludeTeamsDTO } from '../../user/dto/include-teams.dto';
declare const WorkspaceSigninEmailVerifyDTO_base: import("@nestjs/common").Type<UserEmailDTO & IncludeTeamsDTO & UserCodeDTO>;
/**
 *
 */
export declare class WorkspaceSigninEmailVerifyDTO extends WorkspaceSigninEmailVerifyDTO_base implements IUserEmailInput, IUserCodeInput {
}
declare const WorkspaceSigninDTO_base: import("@nestjs/common").Type<UserEmailDTO & UserTokenDTO>;
/**
 *
 */
export declare class WorkspaceSigninDTO extends WorkspaceSigninDTO_base implements IUserEmailInput, IUserTokenInput {
}
export {};
