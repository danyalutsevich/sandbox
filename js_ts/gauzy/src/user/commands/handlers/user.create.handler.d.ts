import { ICommandHandler } from '@nestjs/cqrs';
import { IUser } from '../../../../plugins/contracts/dist/index';
import { UserCreateCommand } from '../user.create.command';
import { UserService } from '../../user.service';
export declare class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
    private readonly userService;
    constructor(userService: UserService);
    execute(command: UserCreateCommand): Promise<IUser>;
}
