import { ICommandHandler } from '@nestjs/cqrs';
import { IUser } from '../../../../plugins/contracts/dist/index';
import { AuthRegisterCommand } from '../auth.register.command';
import { AuthService } from '../../auth.service';
import { UserService } from '../../../user/user.service';
export declare class AuthRegisterHandler implements ICommandHandler<AuthRegisterCommand> {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    execute(command: AuthRegisterCommand): Promise<IUser>;
}
