import { ICommand } from '@nestjs/cqrs';
import { TimeLog } from './../time-log.entity';
export declare class TimeLogCreateCommand implements ICommand {
    readonly input: Partial<TimeLog>;
    static readonly type = "[Time Tracking] Time Log create";
    constructor(input: Partial<TimeLog>);
}
