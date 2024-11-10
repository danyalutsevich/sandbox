import { IUserEmailInput, IUserPasswordInput } from '../../../plugins/contracts';
import { UserEmailDTO } from './user-email.dto';
import { UserPasswordDTO } from './user-password.dto';
import { IncludeTeamsDTO } from './include-teams.dto';
declare const UserLoginDTO_base: import("@nestjs/common").Type<UserEmailDTO & UserPasswordDTO>;
/**
 * User login DTO validation
 */
export declare class UserLoginDTO extends UserLoginDTO_base implements IUserEmailInput, IUserPasswordInput {
}
declare const UserSigninWorkspaceDTO_base: import("@nestjs/common").Type<IncludeTeamsDTO & UserLoginDTO>;
/**
 * User SignIn Workspace DTO validation
 */
export declare class UserSigninWorkspaceDTO extends UserSigninWorkspaceDTO_base {
}
export {};
