import { ICommandHandler } from '@nestjs/cqrs';
import { IReportDayGroupByDate, ITimeLog } from '../../../../../plugins/contracts/dist/index';
import { GetTimeLogGroupByDateCommand } from '../get-time-log-group-by-date.command';
export declare class GetTimeLogGroupByDateHandler implements ICommandHandler<GetTimeLogGroupByDateCommand> {
    /**
     * Executes the command to generate a time log report grouped by date.
     * @param command The command containing time logs and other parameters.
     * @returns A Promise that resolves to the generated report grouped by date.
     */
    execute(command: GetTimeLogGroupByDateCommand): Promise<IReportDayGroupByDate>;
    /**
     * Groups time logs by employee and calculates average duration and activity for each employee.
     * @param logs An array of time logs.
     * @returns An array containing logs grouped by employee with calculated averages.
     */
    getGroupByEmployee(logs: ITimeLog[]): {
        description: string;
        employee: import("../../../../../plugins/contracts/dist/employee.model").IEmployee;
        sum: number;
        task: import("../../../../../plugins/contracts/dist/task.model").ITask;
        activity: number;
    }[];
}
