import { ICommand } from '@nestjs/cqrs';
import { TimeLog } from './../time-log.entity';
export declare class TimeLogUpdateCommand implements ICommand {
    readonly input: Partial<TimeLog>;
    readonly id: TimeLog['id'] | TimeLog;
    readonly manualTimeSlot?: boolean | null;
    static readonly type = "[Time Tracking] Time Log update";
    constructor(input: Partial<TimeLog>, id: TimeLog['id'] | TimeLog, manualTimeSlot?: boolean | null);
}
