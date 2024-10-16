import { ICommand } from '@nestjs/cqrs';
import { TimeOffRequest } from '../time-off-request.entity';
export declare class TimeOffUpdateCommand implements ICommand {
    readonly id: string;
    readonly timeOff: TimeOffRequest;
    static readonly type = "[TimeOff] update";
    constructor(id: string, timeOff: TimeOffRequest);
}
