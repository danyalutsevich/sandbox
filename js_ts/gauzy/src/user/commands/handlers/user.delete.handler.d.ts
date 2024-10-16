import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { UserDeleteCommand } from './../user.delete.command';
import { UserService } from './../../user.service';
export declare class UserDeleteHandler implements ICommandHandler<UserDeleteCommand> {
    private readonly userService;
    constructor(userService: UserService);
    execute(command: UserDeleteCommand): Promise<DeleteResult>;
}
