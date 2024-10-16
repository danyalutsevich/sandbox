import { ITimesheet } from '../../../../plugins/contracts/dist/index';
import { ICommand } from '@nestjs/cqrs';
export declare class TimesheetFirstOrCreateCommand implements ICommand {
    readonly date: Date;
    readonly employeeId: ITimesheet['employeeId'];
    readonly organizationId?: ITimesheet['organizationId'];
    static readonly type = "[Timesheet] First Or Create";
    constructor(date: Date, employeeId: ITimesheet['employeeId'], organizationId?: ITimesheet['organizationId']);
}
