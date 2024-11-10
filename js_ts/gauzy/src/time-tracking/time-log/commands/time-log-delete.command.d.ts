import { ICommand } from '@nestjs/cqrs';
import { TimeLog } from './../time-log.entity';
export declare class TimeLogDeleteCommand implements ICommand {
    readonly ids: string | string[] | TimeLog | TimeLog[];
    readonly forceDelete: boolean;
    static readonly type = "[TimeLog] delete";
    constructor(ids: string | string[] | TimeLog | TimeLog[], forceDelete?: boolean);
}
