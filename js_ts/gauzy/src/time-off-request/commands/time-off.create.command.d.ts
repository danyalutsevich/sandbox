import { ICommand } from '@nestjs/cqrs';
import { TimeOffRequest } from '../time-off-request.entity';
export declare class TimeOffCreateCommand implements ICommand {
    readonly timeOff: TimeOffRequest;
    static readonly type = "[TimeOff] Create";
    constructor(timeOff: TimeOffRequest);
}
