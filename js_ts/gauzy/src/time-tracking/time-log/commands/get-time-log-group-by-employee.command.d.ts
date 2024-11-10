import { ICommand } from '@nestjs/cqrs';
import { ITimeLog } from '../../../../plugins/contracts/dist/index';
export declare class GetTimeLogGroupByEmployeeCommand implements ICommand {
    readonly timeLogs: ITimeLog[];
    readonly timeZone: string;
    static readonly type = "[TimeLog] group by employee";
    constructor(timeLogs: ITimeLog[], timeZone: string);
}
