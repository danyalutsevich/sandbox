import { ICommand } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
export declare class TimesheetGetCommand implements ICommand {
    readonly input: FindOneOptions;
    static readonly type = "[Timesheet] Get";
    constructor(input: FindOneOptions);
}
