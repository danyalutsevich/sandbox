import { ICommandHandler } from '@nestjs/cqrs';
import { IReportDayGroupByEmployee, ITimeLog } from '../../../../../plugins/contracts/dist/index';
import { GetTimeLogGroupByEmployeeCommand } from '../get-time-log-group-by-employee.command';
export declare class GetTimeLogGroupByEmployeeHandler implements ICommandHandler<GetTimeLogGroupByEmployeeCommand> {
    /**
     * Executes the command to generate a time log report grouped by employee.
     * @param command The command containing time logs and other parameters.
     * @returns A Promise that resolves to the generated report grouped by employee.
     */
    execute(command: GetTimeLogGroupByEmployeeCommand): Promise<IReportDayGroupByEmployee>;
    /**
     * Groups time logs by employee and calculates average duration and activity for each project.
     * @param logs An array of time logs.
     * @returns An array containing logs grouped by employee with calculated averages.
     */
    getGroupByProject(logs: ITimeLog[]): {
        description: string;
        task: import("../../../../../plugins/contracts/dist/task.model").ITask;
        project: import("../../../../../plugins/contracts/dist/organization-projects.model").IOrganizationProject;
        client: import("../../../../../plugins/contracts/dist/organization-contact.model").IOrganizationContact;
        sum: number;
        activity: number;
    }[];
}
