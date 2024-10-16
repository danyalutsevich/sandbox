import { IUserEmailInput, IUserTokenInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class WorkspaceSigninVerifyTokenCommand implements ICommand {
    readonly input: IUserEmailInput & IUserTokenInput;
    static readonly type = "[Password Less] Workspace Signin Verify Token";
    constructor(input: IUserEmailInput & IUserTokenInput);
}
