import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IEmployee } from '../../../../plugins/contracts/dist/index';
import { AuthService } from '../../../auth/auth.service';
import { UserOrganizationService } from '../../../user-organization/user-organization.services';
import { EmployeeService } from '../../employee.service';
import { EmployeeCreateCommand } from '../employee.create.command';
import { EmailService } from './../../../email-send/email.service';
import { RoleService } from './../../../role/role.service';
import { UserService } from './../../../user/user.service';
export declare class EmployeeCreateHandler implements ICommandHandler<EmployeeCreateCommand> {
    private readonly _commandBus;
    private readonly _employeeService;
    private readonly _userOrganizationService;
    private readonly _authService;
    private readonly _emailService;
    private readonly _roleService;
    private readonly _userService;
    constructor(_commandBus: CommandBus, _employeeService: EmployeeService, _userOrganizationService: UserOrganizationService, _authService: AuthService, _emailService: EmailService, _roleService: RoleService, _userService: UserService);
    /**
     * Execute the employee creation command.
     *
     * @param command - The employee creation command.
     * @returns The created employee.
     * @throws SomeAppropriateException if an error occurs during the process.
     */
    execute(command: EmployeeCreateCommand): Promise<IEmployee>;
}
