import { ICommandHandler } from '@nestjs/cqrs';
import { IReportDayGroupByClient, ITimeLog } from '../../../../../plugins/contracts/dist/index';
import { GetTimeLogGroupByClientCommand } from '../get-time-log-group-by-client.command';
export declare class GetTimeLogGroupByClientHandler implements ICommandHandler<GetTimeLogGroupByClientCommand> {
    /**
     * Executes the command to generate a time log report grouped by client.
     * @param command The command containing time logs and other parameters.
     * @returns A Promise that resolves to the generated report grouped by client.
     */
    execute(command: GetTimeLogGroupByClientCommand): Promise<IReportDayGroupByClient>;
    /**
     * Groups time logs by employee and calculates average duration and activity for each employee.
     * @param logs An array of time logs.
     * @returns An array containing logs grouped by employee with calculated averages.
     */
    getGroupByEmployee(logs: ITimeLog[]): {
        description: string;
        task: import("../../../../../plugins/contracts/dist/task.model").ITask;
        employee: import("../../../../../plugins/contracts/dist/employee.model").IEmployee;
        sum: number;
        activity: number;
    }[];
}
