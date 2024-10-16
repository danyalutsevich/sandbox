import { ICommandHandler } from '@nestjs/cqrs';
import { IAuthResponse } from '../../../../plugins/contracts/dist/index';
import { WorkspaceSigninVerifyTokenCommand } from '../workspace-signin-verify-token.command';
import { AuthService } from '../../auth.service';
export declare class WorkspaceSigninVerifyTokenHandler implements ICommandHandler<WorkspaceSigninVerifyTokenCommand> {
    private readonly authService;
    constructor(authService: AuthService);
    execute(command: WorkspaceSigninVerifyTokenCommand): Promise<IAuthResponse | null>;
}
