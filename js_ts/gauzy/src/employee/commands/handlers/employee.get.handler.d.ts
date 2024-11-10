import { ICommandHandler } from '@nestjs/cqrs';
import { IEmployee } from '../../../../plugins/contracts/dist/index';
import { EmployeeService } from '../../employee.service';
import { EmployeeGetCommand } from '../employee.get.command';
export declare class EmployeeGetHandler implements ICommandHandler<EmployeeGetCommand> {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    /**
     * Executes the given command to retrieve an employee based on provided input.
     *
     * @param command The command containing the input to fetch an employee.
     * @returns A promise resolving to an IEmployee instance.
     */
    execute(command: EmployeeGetCommand): Promise<IEmployee>;
}
