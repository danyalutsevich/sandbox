import { ICommand } from '@nestjs/cqrs';
import { ITimesheetCreateInput } from '../../../../plugins/contracts/dist/index';
export declare class TimesheetCreateCommand implements ICommand {
    readonly input: ITimesheetCreateInput;
    static readonly type = "[Timesheet] Create Timesheet";
    constructor(input: ITimesheetCreateInput);
}
