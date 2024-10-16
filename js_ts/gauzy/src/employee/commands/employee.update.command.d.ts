import { ICommand } from '@nestjs/cqrs';
import { IEmployee, IEmployeeUpdateInput } from '../../../plugins/contracts';
export declare class EmployeeUpdateCommand implements ICommand {
    readonly id: IEmployee['id'];
    readonly input: IEmployeeUpdateInput;
    static readonly type = "[Employee] Update";
    constructor(id: IEmployee['id'], input: IEmployeeUpdateInput);
}
