import { ICommand } from '@nestjs/cqrs';
import { ITimeLog } from '../../../../plugins/contracts/dist/index';
export declare class ScheduleTimeLogEntriesCommand implements ICommand {
    readonly timeLog?: ITimeLog;
    static readonly type = "Adjust [TimeLog] Entries";
    constructor(timeLog?: ITimeLog);
}
