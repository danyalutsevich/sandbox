import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from './../../../auth/auth.service';
import { UserService } from './../../../user/user.service';
import { EmployeeService } from './../../../employee/employee.service';
import { InviteService } from './../../invite.service';
import { InviteAcceptCommand } from '../invite-accept.command';
import { TypeOrmUserRepository } from './../../../user/repository/type-orm-user.repository';
export declare class InviteAcceptHandler implements ICommandHandler<InviteAcceptCommand> {
    private readonly typeOrmUserRepository;
    private readonly commandBus;
    private readonly inviteService;
    private readonly authService;
    private readonly userService;
    private readonly employeeService;
    constructor(typeOrmUserRepository: TypeOrmUserRepository, commandBus: CommandBus, inviteService: InviteService, authService: AuthService, userService: UserService, employeeService: EmployeeService);
    /**
     * Accepts an invitation based on the provided command.
     * @param command The command containing the invite acceptance data.
     * @returns The authorized user.
     */
    execute(command: InviteAcceptCommand): Promise<Object>;
    /**
     * After accept invite authorize user
     *
     * @param user
     * @returns
     */
    private _authorizeUser;
}
