import { ICommand } from '@nestjs/cqrs';
import { IDateRange, ITimeSlot } from '../../../../plugins/contracts/dist/index';
import { TimeLog } from '../time-log.entity';
export declare class DeleteTimeSpanCommand implements ICommand {
    readonly newTime: IDateRange;
    readonly timeLog: TimeLog;
    readonly timeSlot: ITimeSlot;
    static readonly type = "[TimeLog] delete time span";
    constructor(newTime: IDateRange, timeLog: TimeLog, timeSlot: ITimeSlot);
}
