import { ICommand } from '@nestjs/cqrs';
import { IUpdateTimesheetStatusInput } from '../../../../plugins/contracts/dist/index';
export declare class TimesheetUpdateStatusCommand implements ICommand {
    readonly input: IUpdateTimesheetStatusInput;
    static readonly type = "[Timesheet] Update Status";
    constructor(input: IUpdateTimesheetStatusInput);
}
