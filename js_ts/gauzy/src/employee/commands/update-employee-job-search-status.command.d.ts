import { IEmployee, UpdateEmployeeJobsStatistics } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class UpdateEmployeeJobSearchStatusCommand implements ICommand {
    readonly employeeId: IEmployee['id'];
    readonly input: UpdateEmployeeJobsStatistics;
    static readonly type = "[Employee] Update Job Search Status";
    constructor(employeeId: IEmployee['id'], input: UpdateEmployeeJobsStatistics);
}
