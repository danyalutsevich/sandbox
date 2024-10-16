import { IEmployee } from '../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { EmployeeUpdateCommand } from './../employee.update.command';
import { EmployeeService } from './../../employee.service';
export declare class EmployeeUpdateHandler implements ICommandHandler<EmployeeUpdateCommand> {
    private readonly _employeeService;
    constructor(_employeeService: EmployeeService);
    execute(command: EmployeeUpdateCommand): Promise<IEmployee>;
}
