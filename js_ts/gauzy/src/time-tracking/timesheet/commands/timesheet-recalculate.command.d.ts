import { ICommand } from '@nestjs/cqrs';
import { ITimesheet } from '../../../../plugins/contracts/dist/index';
export declare class TimesheetRecalculateCommand implements ICommand {
    readonly id: ITimesheet['id'];
    static readonly type = "[Timesheet] Recalculate";
    constructor(id: ITimesheet['id']);
}
