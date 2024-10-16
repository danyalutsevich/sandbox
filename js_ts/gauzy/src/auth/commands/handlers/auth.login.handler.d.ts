import { ICommandHandler } from '@nestjs/cqrs';
import { IAuthResponse } from '../../../../plugins/contracts/dist/index';
import { AuthLoginCommand } from '../auth.login.command';
import { AuthService } from '../../auth.service';
export declare class AuthLoginHandler implements ICommandHandler<AuthLoginCommand> {
    private readonly authService;
    constructor(authService: AuthService);
    execute(command: AuthLoginCommand): Promise<IAuthResponse | null>;
}
