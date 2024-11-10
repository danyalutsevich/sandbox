import { ICommandHandler } from '@nestjs/cqrs';
import { WorkspaceSigninSendCodeCommand } from '../workspace-signin-send-code.command';
import { AuthService } from '../../auth.service';
export declare class WorkspaceSigninSendCodeCommandHandler implements ICommandHandler<WorkspaceSigninSendCodeCommand> {
    private readonly authService;
    constructor(authService: AuthService);
    execute(command: WorkspaceSigninSendCodeCommand): Promise<any>;
}
